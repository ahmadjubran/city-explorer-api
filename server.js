"use strict";

const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
const weatherData = require("./data/weather.json");

var cors = require("cors");
app.use(cors());

app.get("/weather", (req, res) => {
  const { lat, lon, searchQuery } = req.query;
  const city = weatherData.find(
    (city) =>
      city.data.lat === lat &&
      city.data.lon === lon &&
      city.data.city_name === searchQuery
  );
  class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }
  const forecasts = city.data.map((day) => {
    return new Forecast(day.valid_date, day.weather.description);
  });
  res.send(forecasts);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
