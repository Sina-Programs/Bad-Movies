import React from "react";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      currentGenre: {},
    };

    this.updateCurrent = this.updateCurrent.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios
      .get("http://localhost:3000/genres")
      .then((response) => {
        this.setState({ genres: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateCurrent(event) {
    this.setState({ currentGenre: event.target.value });
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.updateCurrent}>
          {this.state.genres.map((genre) => {
            return <option value={genre.id}>{genre.name}</option>;
          })}
        </select>
        <br />
        <br />

        <button
          onClick={() => {
            event.preventDefault();
            this.props.getMovies(this.state.currentGenre);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
