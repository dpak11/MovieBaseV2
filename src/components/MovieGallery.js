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
  const { movies, setMovies, movieRef, tagsRef, visitedRef,sortTypeRef } =
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
    sortAndFilter();
  };

  const getTaggedMovieList = (movList) => {
    return movList.filter((m) =>
      tagsRef.current.every((tag) => m.genre.indexOf(tag) >= 0)
    );
  };

  const setFilters = () => {
    const searchedNames = nameSearch();
    return getTaggedMovieList(searchedNames || []);
  };

  const genreList = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];

  const getGenres = (ids) => {
    let list = [];
    for (let i in ids) {
        let {name} = genreList.find((item)=>item.id === ids[i])
        list.push(name)
    }
    return list.join("|")

  }

  const dataRestructure = (results) => {   
   return results.map((item) => {
    const {id,title:name,release_date:release,poster_path,genre_ids:genre,vote_average} = item;
    return {
      id,name,release,
      photos:`https://image.tmdb.org/t/p/w500${poster_path}`,
      genre:getGenres(genre),
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
    const getTrueSort = () => {
      if(params) return params;
      return sortTypeRef.current?.name?"name":sortTypeRef.current?.rating?"rating":sortTypeRef.current?.release?"release":null
    };    
    const sortParam = getTrueSort()
    console.log("getTrueSort",sortParam,sortTypeRef.current)
    let mov = setFilters()
    if(sortParam){
      setSortType(() => {
        return {
          name: false,
          rating: false,
          release: false,
          [sortParam]: true,
        };
      });
    }
    
    if (sortParam === "release") {
      mov = mov.map((m) => { 
        let r = m.release.split("-")
        r.pop();
        const releaseNumeric = Number(r.join(""));
        return {
        ...m,releaseNumeric        
      }});
      mov.sort((a, b) => a.releaseNumeric - b.releaseNumeric);
    }
    if (sortParam === "name") {
      mov.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (sortParam === "rating") {
      mov.sort((a, b) => b.rating - a.rating);
    }

    sortTypeRef.current = {...sortType};
    console.log("sortTypeRef", sortTypeRef.current)
    setMovies(mov);
  };

  
  useEffect(() => {
    console.log("OnMount useEffect");
    if (!movieRef.current.length) {
      fetchData();
    } else {   
      sortAndFilter() 
    }
    console.log("tagsRef",tagsRef.current)
  }, []);

  useEffect(() => {
    console.log("useEffect, movie name changed");
    sortAndFilter();
  }, [moviename]);

  console.log("rendered gallery", sortTypeRef.current)
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
