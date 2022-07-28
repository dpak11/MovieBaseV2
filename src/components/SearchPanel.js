import { MovieContext } from "../store/MovieContext";
import { useContext } from "react";
import styles from '../css/search-panel.module.css';

const SearchPanel = ({moviename,movieSearch,sortType, sortby, selectGenre}) => { 
  const {tagsRef,movieRef} = useContext(MovieContext);
  let allGenres = movieRef.current
    ? movieRef.current.map((m) => m.genre.split("|"))
    : [];
  allGenres = allGenres.flat();
  allGenres = [...new Set(allGenres)].filter((g) => !g.includes("no genre"));
  allGenres.sort();
  return (
    <>
      <p style={{ textAlign: "center" }}>
        <input
          className={styles.searchStyle}
          type="text"
          value={moviename}
          onChange={(e) => movieSearch(e)}
          placeholder="Type movie name..."
        />
      </p>
      <p className={styles.sortSection}>
        <label>Sort By :</label>
        <span
          className={sortType?.rating ? `${styles.active}` : ""}
          onClick={() => sortby("rating")}
        >
          Rating
        </span>
        &nbsp; | &nbsp;
        <span
          className={sortType?.name ? `${styles.active}` : ""}
          onClick={() => sortby("name")}
        >
          Name
        </span>
        &nbsp; | &nbsp;
        <span
          className={sortType?.release ? `${styles.active}` : ""}
          onClick={() => sortby("release")}
        >
          Release Date
        </span>
      </p>
      <p className={styles.genreListing}>
        {allGenres &&
          allGenres.map((genre, i) => (
            <span
              key={i}
              onClick={(e) => selectGenre(genre, e.target)}
              className={tagsRef.current.includes(genre)? `${styles.tagSelected} ${styles.genreStyle}`: styles.genreStyle}
            >
              {genre}
            </span>
          ))}
      </p>
    </>
  );
};
export default SearchPanel;