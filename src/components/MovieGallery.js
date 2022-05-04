import { MovieContext } from "../store/MovieContext";
import { useContext, useState, useEffect } from "react";
import { SearchPanel } from "./SearchPanel";
import { VisitedList } from "./VisitedList";
import Movie from "./Movie";
import "../css/movie-gallery.css";
//https://api.themoviedb.org/3/discover/movie?api_key=0fec03f37874864d189b9e4e3c1eec79&with_origin_country=IN&with_original_language=ta


const Gallery = () => {
  const [moviename, setMoviename] = useState("");
  const [sortType, setSortType] = useState({
    name: false,
    rating: false,
    runtime: false,
  });
  const { movies, setMovies, movieRef, tagsRef, visitedRef } =
    useContext(MovieContext);

  const movieSearch = (e) => {
    setMoviename(e.target.value);
  };

  const nameSearch = () => {
    if (moviename === "") return movieRef.current;
    return movieRef.current.filter((m) =>
      m.name.toLowerCase().includes(moviename.toLowerCase())
    );
  };

  const removeMovie = (id) => {
    movieRef.current = movieRef.current.filter((m) => m.id !== id);
    //setMovies(setFilters());
    sortAndFilter();
  };

  const selectGenre = (genre, target) => {
    const tagIndex = tagsRef.current.indexOf(genre);
    if (tagIndex >= 0) {
      tagsRef.current.splice(tagIndex, 1);
    } else {
      tagsRef.current.push(genre);
    }
    target.classList.toggle("tag-selected");
    //setMovies(setFilters());
    sortAndFilter();
  };

  const getTaggedMovieList = (movList) => {
    return movList.filter((m) =>
      tagsRef.current.every((tag) => m.genre.indexOf(tag) >= 0)
    );
  };

  const setFilters = () => {
    const searchedNames = nameSearch();
    const tagsFilter = getTaggedMovieList(searchedNames || []);
    return tagsFilter;
  };

  const genreList = {"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]};

  const getGenres = (ids) => {
    let list = [];
    for (let i in ids) {
        let {name} = genreList.genres.find((item)=>item.id === ids[i])
        list.push(name)
    }
    return list.join("|")

  }

  const dataRestructure = (results) => {   
   return results.map((item) => {
    const {id,title,release_date,poster_path,genre_ids,vote_average} = item;
    return {
      id,
      name:title,
      release:release_date,
      photos:`https://image.tmdb.org/t/p/w500${poster_path}`,
      genre:getGenres(genre_ids),
      rating:Number(vote_average)*10
    }    
   });
  }
 
  const callMovieAPI = async (pagenum) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=0fec03f37874864d189b9e4e3c1eec79&language=en-US&page=${pagenum}`
    );
    const movies = await data.json();
    const movieData = dataRestructure(movies.results)    
    movieRef.current.push(...movieData);
    return;
  }

  const fetchData = async () => {
    await callMovieAPI(1)
    await callMovieAPI(2)
    await callMovieAPI(3)
    await callMovieAPI(4)  
    await callMovieAPI(5)  
    console.log(movieRef.current)
    setMovies(movieRef.current);
  };

 
  const sortAndFilter = (params=null) => {
    const param = params || document.querySelector(".sortSection .active")?.dataset?.sortype;
    let mov = setFilters();
    setSortType(() => {
      return {
        name: false,
        rating: false,
        release: false,
        [param]: true,
      };
    });
    if (param === "release") {
      mov = mov.map((m) => { 
        let r = m.release.split("-")
        r.pop();
        const releaseNumeric = Number(r.join(""));
        return {
        ...m,releaseNumeric        
      }});
      mov.sort((a, b) => a.releaseNumeric - b.releaseNumeric);
    }
    if (param === "name") {
      mov.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (param === "rating") {
      mov.sort((a, b) => b.rating - a.rating);
    }
    setMovies(mov);
  };

  useEffect(() => {
    console.log("useEffect, movie name changed");
    //setMovies(setFilters());
    sortAndFilter();
  }, [moviename]);

  useEffect(() => {
    tagsRef.current = [];
    console.log("useEffect");
    if (!movieRef.current || !movieRef.current.length) {
      console.log("xxx");
      fetchData();
    } else {
      console.log("yyy");
      setMovies(movieRef.current);
    }
  }, []);

  const visitedPage = sessionStorage.getItem("page") || "";
  if (visitedPage) {
    const index = visitedRef.current.indexOf(visitedPage);
    if (index >= 0) {
      visitedRef.current.splice(index, 1);
    }
    visitedRef.current.push(visitedPage);
    sessionStorage.removeItem("page");
  }
  const noMovieText = movieRef.current.length && !movies.length ? "No Movies Found" : !movieRef.current.length ? "Loading..." : "";

  return (
    <div className="galleryStyle">
      <h1>Movie Gallery ({movies.length})</h1>

      <SearchPanel
        moviename={moviename}
        movieSearch={movieSearch}
        movieRef={movieRef.current}
        sortType={sortType}
        sortby={sortAndFilter}
        selectGenre={selectGenre}
      />      
      
      <VisitedList visited={visitedRef.current} />

      <hr style={{ borderColor: "grey" }} />

      <div className="tileStyle">
        {movies.length ? (
          movies.map((mov, i) => (
            <Movie
              key={i}
              movInfo={mov}
              removeMovie={removeMovie}
              isvisited={visitedRef.current.includes(mov.name)}
            />
          ))
        ) : (
          <p>
            <span>{noMovieText}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
