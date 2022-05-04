import { Link,useParams } from "react-router-dom";
import { MovieContext } from "../store/MovieContext";
import { useContext,useEffect,useState } from "react";
import "../css/movie-detail.css";

//https://api.themoviedb.org/3/movie/19404?api_key=0fec03f37874864d189b9e4e3c1eec79&language=en-US

const MovieDetail = ({ match }) => {
  const { movies } = useContext(MovieContext);
  const [details, setDetails] = useState(null);
  const params = useParams();
  const movieID = Number(params.id);  
  const movie = movies.find((m) => m.id === movieID);
  sessionStorage.setItem("page", movie.name);
  const genres = movie.genre.split("|");
  let colorRate = Number(movie.rating) > 50 ? "rate-grey" : "rate-pale";
  colorRate = Number(movie.rating) >= 85 ? "rate-red" : colorRate;
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=0fec03f37874864d189b9e4e3c1eec79&language=en-US`)
    .then(data=>data.json())
    .then(movDetails => setDetails(movDetails))
  },[]);
  const mRelease=movie.release.split("-")
  const mov_date = `${mRelease[2]}/${mRelease[1]}/${mRelease[0]}`
  return (
    details && (<div className="detailStyle">
      <div>
        <h4 style={{ color: "grey" }}>MOVIE DETAILS:</h4>
        <h1>{movie.name}</h1>
        <p>
          <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} width="300" alt="" />
        </p>
        <p>
          Genre {genres.map((genre, i) => (
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
          Country: <b>{details.production_countries[0].name}</b>
        </p>
        <p>
          {details.overview}
        </p>
        <p><a href={`https://www.imdb.com/title/${details.imdb_id}/`} target="_blank">IMDB</a></p>
        <p>
          <span className={`${colorRate} ratingText`}>{movie.rating}%</span>
        </p>
        <Link to="/gallery">&lt; Go Back</Link>
      </div>
    </div>)
  );
};

export default MovieDetail;
