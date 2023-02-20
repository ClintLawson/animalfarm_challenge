const { getAvg,getMin,getMax,getMode } = require('./utiliities')

async function cityGeolocateApi(apiKey, city, limit=5){
    console.log("________cityGeolocateApi()");

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`
    const result = await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            return data.map(x => ({
                "city": x.name,
                "state":x.state,
                "country": x.country,
                "latitude": x.lat,
                "longitude": x.lon
            }));
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}

async function weatherApi(apiKey, latitude, longitude){
    console.log("________weatherapi()");

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=standard&exlude=hourly,current,minutely,alerters&appid=${apiKey}`
    const result = await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            return data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}

function mapWeatherApiData(data){
    // the purpose of this method is to transform/aggregate the data for each day 
    // ...because the records for 5 days come as 1 array of hourly records

    try{
        const records =  data.list;

        const groupRecordsByDate = records.reduce((dictionaries, record) => {
        // Convert the timestamp to a Date object and extract the date string
            const dt = record.dt;
            const date = new Date(dt*1000).toISOString().slice(0, 10);

            // Check if a dictionary already exists for the date, or create a new one
            const dictionary = dictionaries.find(d => d.date === date) || { date, records: [] };

            // Add the timestamp to the dictionary's records array
            dictionary.records.push(record);

            // If the dictionary didn't already exist, add it to the array
            if (!dictionaries.includes(dictionary)) {
                dictionaries.push(dictionary);
            }

            return dictionaries;
        }, []);

        // calculate the overview values for each date
        let result = groupRecordsByDate.map(x => ({
            "date":x.date,
            "highTemp":getMax(x.records.map(r => r.main.temp_max)),
            "lowTemp":getMin(x.records.map(r => r.main.temp_min)),
            "windMax":getMax(x.records.map(r => r.wind.speed)),
            "windMin":getMin(x.records.map(r => r.wind.speed)),
            "windGustMax":getMax(x.records.map(r => r.wind.gust)),
            "windDirectionAvg":getAvg(x.records.map(r => r.wind.deg)),
            "weatherModeId":getMode(x.records.map(r => r.weather[0].id)),
            "weatherModeMain":getMode(x.records.map(r => r.weather[0].main)),
            "weatherModeDescript":getMode(x.records.map(r => r.weather[0].description)),
            // weatherModeIcon can be used to get the icon from `http://openweathermap.org/img/wn/${--icon var here--}@2x.png`
            "weatherModeIcon":getMode(x.records.map(r => r.weather[0].icon.slice(0, -1).concat('d'))),
            "records": x.records
        }));

        return result;
    }
    catch(error){
        console.log(error)
    }
}

module.exports = { 
    cityGeolocateApi: cityGeolocateApi,
    weatherApi: weatherApi,
    mapWeatherApiData: mapWeatherApiData
};