# Weather App Challenge

Setup:
1. Go to openweathermap.org and retrieve or create an api key
2. create a file named secrets.js which exports a json object that includes the key as openweathermap_api_key with your api key as the value.
3. npm install 
4. npm run start

TODO'S:
*Backend*
[x] - complete the endpoint on express that will serve the html
[x] - complete the city-search/ endpoint for getting locations based on the user query. Should return location name and latitude/longitude
[x] - complete the weather-5day/ endpoint that will return the weather forecast for the next 5 days.
[] - change the secrets file to a json file rather than a js file

*Frontend*
[] - weather app to leave temperature in kelvin? (would need to create a function for )
[] - create ui input that can query the city api with users input and return options to be selected that include: city, state, country, latitude and longitude.
[] - create ui list that will display the available weather data of upcoming days. If screen width permits display them in side by side with the first day as a large icon ontop. Otherwise stack them veritcally and make them collaspeable as needed.
[] - create the cards that will display in 3 forms: extra large with full data, medium for most data to be displayed while in list view and small for mobile to be displayed vertically with most days fully collapsed. 
