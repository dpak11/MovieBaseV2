import { Link,useParams } from "react-router-dom";
import { MovieContext } from "../store/MovieContext";
import { useContext,useEffect,useState } from "react";
import {GET_VALUES} from "../store/Constants";
import "../css/movie-detail.css";

const {MOVIE_DETAIL,MOVIE_API} = GET_VALUES;

const MovieDetail = () => {
  const { movieState,currentVisitRef } = useContext(MovieContext);
  const [details, setDetails] = useState(null);
  const params = useParams();
  const movieID = Number(params.id);  
  const movie = movieState.movies.find((m) => m.id === movieID);  
  const genres = movie.genre.split("|");
  let colorRate = Number(movie.rating) > 50 ? "rate-grey" : "rate-pale";
  colorRate = Number(movie.rating) >= 85 ? "rate-red" : colorRate;
  currentVisitRef.current = movie.name;
  console.log("params", params)
  useEffect(()=>{
    const url = `${MOVIE_DETAIL}${movieID}${MOVIE_API}`;
    fetch(url)
    .then(data=>data.json())
    .then(movDetails => setDetails(movDetails))
  },[movieID]);

  const mRelease=movie.release.split("-")
  const mov_date = `${mRelease[2]}/${mRelease[1]}/${mRelease[0]}`
  return (
    details && (<div className="detailStyle">
      <div>
        <h4 style={{ color: "grey" }}>MOVIE DETAILS: <span className="back-link"><Link to="/gallery">&lt; Go Back</Link></span></h4>
        <h1>{movie.name}</h1>
        <p>
          <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} width="300" alt="" />
          <span className={`${colorRate} ratingText`}>{movie.rating}%</span>
        </p>
        <p>
          {genres.map((genre, i) => (
            <span key={i} className="tags" style={{ marginRight: "10px" }}>
               {genre}
            </span>
          ))}
        </p>
        <p>
          Run Time: <b>{details.runtime} min</b>
        </p>
        <p>
          Release Date: <b>{mov_date}</b>
        </p>
        <p>
          Country: <b>{details.production_countries[0]?.name}</b>
        </p>
        <p>
          {details.overview}
        </p>
        <p><a href={`https://www.imdb.com/title/${details.imdb_id}/`} target="_blank">IMDB</a></p>
        {/* <p>
          <span className={`${colorRate} ratingText`}>{movie.rating}%</span>
        </p> */}
        
      </div>
    </div>)
  );
};

export default MovieDetail;
