import { Link } from "react-router-dom";
import '../css/movie.css';

const Movie = ({ movInfo, removeMovie, isvisited }) => {
  const deleteMovie = (e) => {
    const id = e.target.getAttribute("data-id");
    removeMovie(Number(id));
  };

  const genres = movInfo.genre.split("|");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const date = movInfo.release.split("-");
  const release = `${months[Number(date[1])-1]} ${date[0]}`;  

  return (
    <div className={isvisited ? "movieBlock isChecked" : "movieBlock"}>
      <p style={{ textAlign: "center" }}>
      <Link style={{ textDecoration: "none" }} to={`/details/${movInfo.id}`}><img src={`${movInfo.photos}`} alt="" /></Link>
      </p>
      <h3>
        <Link style={{ textDecoration: "none" }} to={`/details/${movInfo.id}`}>
          {movInfo.name}
        </Link>
      </h3>
      <p className="genre-block">
        {genres.map((genre, i) => (
          <span key={i} className="tags">
            {genre}
          </span>
        ))}
      </p>

       <p>{release}</p>  
      <p>{Number(movInfo.rating)}%</p>
      <p>
        <button
          className="deleteBtn"
          data-id={movInfo.id}
          onClick={deleteMovie}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default Movie;
