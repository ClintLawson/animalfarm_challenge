
const express = require('express');
const secrets = require('./secrets');
const {weatherApi, cityGeolocateApi, mapWeatherApiData} = require('./services');
  
const app = express();
const PORT = 3000;
const apiKey = secrets.openweathermap_api_key;
  
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

app.get('/api/city-search/:cityName', async (req, res) => {
    try{
        console.log("________app.get()")

        let city = req.params.cityName;
        const result = await cityGeolocateApi(apiKey, city);

        res.send(result)
    }
    catch{
        res.status(500).send('An error occurred');
    }
});

app.get('/api/weather-5day/:latitude/:longitude', async (req, res) => {
    try{
        console.log("________app.get()")

        const lat = req.params.latitude;
        const lon = req.params.longitude;

        const data = await weatherApi(apiKey, lat, lon);

        const result = mapWeatherApiData(data);

        res.send(result)
    }
    catch{
        res.status(500).send('An error occurred');
    }
});

  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is listening on port: "+ PORT+"!")
    else 
        console.log("Error occurred, server can't start... \n", error);
    }
);