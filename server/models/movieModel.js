const sqlDb = require("../../db");

module.exports = {
  badmovies: {
    save: (movie, callback) => {
      const query =
        "INSERT IGNORE INTO favMovies (movieName, releaseYear, rating, movieDescription) VALUES (?, ?, ?, ?);";
      sqlDb.query(
        query,
        [
          movie.title,
          Number(movie.release_date.slice(0, 4)),
          movie.vote_average,
          movie.overview,
        ],
        (err, data) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, data);
          }
        }
      );
    },

    delete: (movie, callback) => {
      const query = `DELETE FROM favMovies WHERE movieName = ?`;
      sqlDb.query(query, [movie.title], (err, data) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    },
  },
};
