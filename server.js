const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

function Location(query, geoData) { 
  this.city_query = query;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
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

app.listen(PORT, () => { 
  console.log('Listening to PORT: ' + PORT);
})
