"use strict";

const request = require('request');

const musementEndpoint = 'https://api.musement.com/api/v3/cities';
const weatherApiKey = process.env.WEATHERAPI_KEY;
const days = 2;

// First request to the Musement API (no additional headers needed for this specific use case)
request(musementEndpoint, (err, res, body) => {
  if (err) return err;
  const cities = JSON.parse(body);
  for (let city of cities) {
    // For each city, call the WeatherAPI endpoint to retrieve weather forecast
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city.latitude},${city.longitude}&days=${days}`
    request(url, (err, res, body) => {
      // If the request fails, return a warning
      if (err) return process.stdout.write(`Could not process city ${city.name} | Error during request`);
      const weather = JSON.parse(body);
      const today = weather?.forecast?.forecastday?.[0]?.day?.condition?.text;
      const tomorrow = weather?.forecast?.forecastday?.[1]?.day?.condition?.text;
      // For each city, print the forecast, or warn when it's not available
      return process.stdout.write(`Processed city ${city.name} | ${today || 'Today not available'} - ${tomorrow || 'Tomorrow not available'}\n`);
    })
  }
});
