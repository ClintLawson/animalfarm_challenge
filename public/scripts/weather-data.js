//------------- WEATHER DATA -------------
async function fetchWeatherData(lat,lon){
    const url = `http://localhost:3000/api/weather-5day/${lat}/${lon}`
    const result = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        });
    return result;
}

function updateWeatherData(cityData){
    console.log(cityData)
    // console.log(JSON.parse(cityData))
    const locationTitle = document.getElementById('location-title')
    locationTitle.innerText = `${cityData.city}, ${cityData.state}, ${cityData.country}`

    fetchWeatherData(cityData.latitude, cityData.longitude)
        .then(data => {
            console.log(data)
            const weatherDataParent = document.getElementById('weather-data-container')
            const children = data?.map(co => {
                console.log(co)
                return `<div class="card">
                            <h2>${co.highTemp} / ${co.lowTemp}</h2>
                        </div>`
            })
            weatherDataParent.innerHTML = children.join('')
        })
}