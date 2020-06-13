const movieModel = require('../models/movieModel.js');
var axios = require('axios');
const { API_KEY } = require('../../config');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=1000&vote_average.gte=8&include_adult=false&page=1&with_genres=${req.query.genre}`
      )
      .then(({ data }) => {
        res.send(data.results);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  getGenres: (req, res) => {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=71642da596401f1182a87d53662a28d4&language=en-US'
      )
      .then(({ data }) => {
        res.send(data.genres);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  saveMovie: (req, res) => {
    movieModel.badmovies.save(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.sendStatus(201);
      }
    });
  },
  deleteMovie: (req, res) => {
    movieModel.badmovies.delete(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.sendStatus(201);
      }
    });
  },
};
