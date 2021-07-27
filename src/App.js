import './App.css';
import Movie from './components/Movie'
import { useEffect, useState } from 'react';

// API KEY = 08d586870351049aef526eeef0b34508

const FEATURE_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=08d586870351049aef526eeef0b34508&page=1";
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=08d586870351049aef526eeef0b34508&query="


function App() {
  const [movies, setMovies] = useState([]);
  const [searchT, setSearchT] = useState([]);

  useEffect(async () => {
    getMovies(FEATURE_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      setMovies(data.results)
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchT) {
      getMovies(SEARCH_API + searchT);

      setSearchT('');
    }
  };

  const handleOnChange = (e) => {
    setSearchT(e.target.value);
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchT}
            onChange={handleOnChange}
          />

        </form>

      </header>
      <div className="movie-container">

        {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)};
      </div>
    </>
  );
}

export default App;
