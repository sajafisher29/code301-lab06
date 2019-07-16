'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

function Location(query, geoData) { 
  this.city_query = query;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = time;
}

app.get('/location', (req, res) => { 
  try { 
    const geoData = require('./data/geo.json');
    const user_location = new Location(req.query.data, geoData);
    res.send(user_location);
  }
  catch (err) { 
    res.status(400).send({'error': err })
  }
});

app.get('/weather', (req, res) => {
  const weatherArr = [];

  const darkskyData = require('./data/darksky.json');
  darkskyData.daily.data.forEach( day => {
    weatherArr.push(new Weather(day.summary, new Date(day.time).toString()));
  })
  res.send(weatherArr);
})

app.listen(PORT, () => { 
  console.log('Listening to PORT: ' + PORT);
})
