const axios = require("axios");

async function handleWeather(req, res) {
  let { lat, lon } = req.query;
  const url = `${process.env.WEATHER_API}?key=${process.env.WEATHER_API_KEY}&lon=${lat}&lat=${lon}`;
  const weatherData = await axios.get(url);

  try {
    const weatherDay = weatherData.data.data.map((day) => new Weather(day));
    res.status(200).send(weatherDay);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}

class Weather {
  constructor(object) {
    this.date = object.datetime;
    this.description = object.weather.description;
  }
}

exports.handleWeather = handleWeather;
