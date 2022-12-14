const axios = require("axios");

const moviesCache = {};

async function handleMovies(req, res) {
  const { city } = req.query;

  if (moviesCache[city] !== undefined) {
    res.status(200).send(moviesCache[city]);
  } else {
    const url = `${process.env.MOVIE_API}?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

    const movieData = await axios.get(url);

    try {
      const movielist = movieData.data.results.map((movie) => new Movie(movie));
      moviesCache[city] = movielist;
      res.status(200).send(movielist);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
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

exports.handleMovies = handleMovies;
