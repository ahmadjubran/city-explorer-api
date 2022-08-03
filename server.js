"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/weather", handleWeather);
app.get("/movies", handleMovies);

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

async function handleMovies(req, res) {
  let { city } = req.query;

  const url = `${process.env.MOVIE_API}?api_key=${process.env.MOVIE_API_KEY}`;

  const movieData = await axios.get(url);

  try {
    const filteredMovies = movieData.data.results.filter((movie) => {
      return movie.title.toLowerCase().includes(city.toLowerCase());
    });
    const movielist = filteredMovies.map((movie) => new Movie(movie));
    res.status(200).send(movielist);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
class Weather {
  constructor(object) {
    this.date = object.datetime;
    this.description = object.weather.description;
  }
}

class Movie {
  constructor(object) {
    this.title = object.title;
    this.overview = object.overview;
    this.average_votes = object.vote_average;
    this.total_votes = object.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${object.poster_path}`;
    this.popularity = object.popularity;
    this.released_on = object.release_date;
  }
}
