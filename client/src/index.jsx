import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
// import AnyComponent from './components/filename.jsx'
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };

    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.clickFav = this.clickFav.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.getMovies(28);
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios
      .get("/search", {
        params: {
          genre: genre,
        },
      })
      .then((results) => {
        this.setState({ movies: results.data });
      })
      .catch((err) => console.log(err));
  }

  saveMovie(movie) {
    // same as above but do something diff
    axios
      .post("/save", movie)
      .then(() => {
        var movieIndex = this.state.favorites.findIndex(
          (ele) => ele.title === movie.title
        );
        if (movieIndex === -1) {
          this.setState({ favorites: this.state.favorites.concat(movie) });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteMovie(movie) {
    // same as above but do something diff
    axios
      .post("/delete", movie)
      .then(() => {
        var movieIndex = this.state.favorites.findIndex(
          (ele) => ele.title === movie.title
        );
        let newFavs = this.state.favorites.slice();
        newFavs.splice(movieIndex, 1);

        console.log(newFavs);

        this.setState({
          favorites: newFavs,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clickFav(movie) {
    if (this.state.showFaves === false) {
      this.saveMovie(movie);
    } else {
      this.deleteMovie(movie);
    }
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
          />

          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            clickFav={this.clickFav}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
