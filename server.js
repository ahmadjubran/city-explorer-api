"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const axios = require("axios");
const { handleWeather } = require("./modules/weather");
const { handleMovies } = require("./modules/movies");

const app = express();
app.use(cors());

app.get("/weather", handleWeather);
app.get("/movies", handleMovies);

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
