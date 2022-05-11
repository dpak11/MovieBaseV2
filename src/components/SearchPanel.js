import '../css/search-panel.css';
import { MovieContext } from "../store/MovieContext";
import { useContext } from "react";

export const SearchPanel = ({moviename,movieSearch,sortType, sortby, selectGenre, movieRef}) => { 
  const {tagsRef} = useContext(MovieContext);
  let allGenres = movieRef
    ? movieRef.map((m) => m.genre.split("|"))
    : [];
  allGenres = allGenres.flat();
  allGenres = [...new Set(allGenres)].filter((g) => !g.includes("no genre"));
  allGenres.sort();
  
  return (
    <>
      <p style={{ textAlign: "center" }}>
        <input
          className="searchStyle"
          type="text"
          value={moviename}
          onChange={(e) => movieSearch(e)}
          placeholder="Type movie name..."
        />
      </p>
      <p className="sortSection">
        <label>Sort By :</label>
        <span
          className={sortType.rating ? "active" : ""}
          data-sortype="rating"
          onClick={() => sortby("rating")}
        >
          Rating
        </span>
        &nbsp; | &nbsp;
        <span
          className={sortType.name ? "active" : ""}
          data-sortype="name"
          onClick={() => sortby("name")}
        >
          Name
        </span>
        &nbsp; | &nbsp;
        <span
          className={sortType.release ? "active" : ""}
          data-sortype="release"
          onClick={() => sortby("release")}
        >
          Release Date
        </span>
      </p>
      <p className="genreListing">
        {allGenres &&
          allGenres.map((genre, i) => (
            <span
              key={i}
              onClick={(e) => selectGenre(genre, e.target)}
              className={tagsRef.current.includes(genre)?"tag-selected genreStyle":"genreStyle"}
            >
              {genre}
            </span>
          ))}
      </p>
    </>
  );
};
