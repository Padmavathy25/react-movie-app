import './App.css';
import React ,{ useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from "./Components/MovieList";
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavourite from './Components/AddToFavourites';
import RemoveFavourite from './Components/RemoveFavourite';
const App = () =>{
  const [movies,setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url= `http://www.omdbapi.com/?s=${searchValue}&apikey=########`;

    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
    if(responseJson.Search){
    setMovies(responseJson.Search)
    }
  };
  const saveToLocalStorage = (items) => {
   localStorage.setItem("react-app-fav-movie",JSON.stringify(items));};
   const addFavouriteMovie = (movie) =>{
    const newFavouriteMovie = [...favourites,movie];
    setFavourites(newFavouriteMovie);
   saveToLocalStorage(newFavouriteMovie);
   };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteMovie = favourites.filter(
      favourites => favourites.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteMovie);
    saveToLocalStorage(newFavouriteMovie);
  }

  useEffect( () =>{
  getMovieRequest(searchValue);}, [searchValue]);

  useEffect( () =>
  {
    const movieFav = JSON.parse(localStorage.getItem("react-app-fav-movie"));
    setFavourites(movieFav);
  },[]);
  
  return (
    <div className="container-fluid movie-app ">
    <div className='row d-flex align-items-center mt-4 mb-4'>
    <MovieListHeading heading='Movies' />
    <SearchBox 
    searchValue={searchValue} 
    setSearchValue={setSearchValue} />
    </div>
      <div className="row">
       <MovieList 
       movies={movies} 
       favouriteComponent={AddFavourite}
         handleFavClick= {addFavouriteMovie}
       />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />

      </div>
      <div className="row" >
        <MovieList 
        movies={favourites}
        handleFavClick={removeFavouriteMovie} 
        favouriteComponent={RemoveFavourite} />
      </div>
    
    </div>
  );
}

export default App;
