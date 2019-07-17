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

function checkError(req, res) { 
  if (req.query.data !== 'Lynnwood') { 
    res.status(500).send('Sorry, something went wrong');
  }
}

app.get('/location', (req, res) => { 
  try { 
    checkError(req, res);
    const geoData = require('./data/geo.json');
    const user_location = new Location(req.query.data, geoData);
    res.send(user_location);
  }
  catch (err) { 
    res.status(500).send('Sorry, something went wrong');
  }
});

app.get('/weather', (req, res) => {
  try {
    checkError(req, res);
    const weatherArr = [];
    const darkskyData = require('./data/darksky.json');
    darkskyData.daily.data.forEach( day => {
      weatherArr.push(new Weather(day.summary, new Date(day.time*1000).toString()));
    })
    res.send(weatherArr);
  } 
  catch(err) { 
    res.status(500).send('Sorry, something went wrong');
  }
})

app.listen(PORT, () => { 
  console.log('Listening to PORT: ' + PORT);
})
