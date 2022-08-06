const axios = require("axios");

const weatherCache = {};

async function handleWeather(req, res) {
  const { searchQuery, lat, lon } = req.query;

  let todayDate = new Date().toISOString().slice(0, 10);
  console.log(todayDate);

  if (
    weatherCache[searchQuery] !== undefined &&
    weatherCache[searchQuery][0].date === todayDate
  ) {
    res.status(200).send(weatherCache[searchQuery]);
  } else {
    const url = `${process.env.WEATHER_API}?key=${process.env.WEATHER_API_KEY}&lon=${lat}&lat=${lon}`;
    const weatherData = await axios.get(url);

    try {
      const cityData = weatherData.data.data.map((day) => new Weather(day));
      weatherCache[searchQuery] = cityData;
      res.status(200).send(cityData);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }
}

class Weather {
  constructor(object) {
    this.date = object.datetime;
    this.description = object.weather.description;
  }
}

exports.handleWeather = handleWeather;
