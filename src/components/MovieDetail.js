import { Link } from "react-router-dom";
import { MovieContext } from "../store/MovieContext";
import { useContext } from "react";
import "../css/movie-detail.css";

const MovieDetail = ({ match }) => {
  const { movies } = useContext(MovieContext);
  const movie = movies.find((m) => m.id === Number(match.params.id));

  sessionStorage.setItem("page", movie.name);
  const genres = movie.genre.split("|");
  let colorRate = Number(movie.rating) > 50 ? "rate-grey" : "rate-pale";
  colorRate = Number(movie.rating) >= 85 ? "rate-red" : colorRate;
  return (
    <div className="detailStyle">
      <div>
        <h4 style={{ color: "grey" }}>MOVIE DETAILS:</h4>
        <h1>{movie.name}</h1>
        <p>
          {genres.map((genre, i) => (
            <span key={i} className="tags" style={{ marginRight: "10px" }}>
              Genre: {genre}
            </span>
          ))}
        </p>
        <p>
          Run Time: <b>{movie.runtime}</b>
        </p>
        <p>
          Release Date: <b>{movie.release}</b>
        </p>
        <p>
          Country: <b>{movie.country}</b>
        </p>
        <p>
          <span className={`${colorRate} ratingText`}>{movie.rating}%</span>
        </p>
        <Link to="/gallery">&lt; Go Back</Link>
      </div>
    </div>
  );
};

export default MovieDetail;
