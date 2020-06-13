-- SET UP SCHEMA HERE
DROP DATABASE IF EXISTS badmovies;

CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE favMovies (
    movieName VARCHAR(100) NOT NULL PRIMARY KEY,
    releaseYear INT,
    rating FLOAT,
    movieDescription VARCHAR(1000)
)

-- mysql -u root -p < db/moviesSchema.sql