import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard/MovieCard";
import searchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?apikey=e0f1ca54&";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => {
            return (
              <div key={index}>
                <MovieCard movie={movie} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
