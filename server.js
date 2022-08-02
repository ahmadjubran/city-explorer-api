"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const weatherData = require("./data/weather.json");

app.get("/weather", (req, res) => {
  let searchQuery = req.query.searchQuery;

  const city = weatherData.find(
    (city) => city.city_name.toLowerCase() === searchQuery.toLowerCase()
  );

  try {
    const weatherArr = city.data.map((day) => new Forecast(day));
    res.status(200).send(weatherArr);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});
class Forecast {
  constructor(object) {
    this.date = object.valid_date;
    this.description = object.weather.description;
  }
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
