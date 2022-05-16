import { MovieContext } from "../store/MovieContext";
import { useContext, useState, useEffect } from "react";
import SearchPanel from "./SearchPanel";
import VisitedList from "./VisitedList";
import Movie from "./Movie";
import {GET_VALUES} from "../store/Constants";
import "../css/movie-gallery.css";

const { THUMBNAIL_PATH,TOP_RATED_MOVIE,GENRE_LIST} = GET_VALUES

const Gallery = () => {  
  const [moviename, setMoviename] = useState("");  
  const { movieRef, tagsRef, visitedRef,sortTypeRef, movieDispatch, movieState } =
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

  
  const getGenres = (ids) => {
    let list = [];
    for (let i in ids) {
        let {name} = GENRE_LIST.find((item)=>item.id === ids[i])
        list.push(name)
    }
    return list.join("|")

  }

  const dataRestructure = (results) => {   
   return results.map((item) => {
    const {id,title:name,release_date:release,poster_path,genre_ids:genre,vote_average} = item;
    return {
      id,name,release,
      photos:`${THUMBNAIL_PATH}${poster_path}`,
      genre:getGenres(genre),
      rating:Number(vote_average)*10
    }    
   });
  }
 
  const callMovieAPI = async (apiCalls) => {
    console.log("callMovieAPI...")
    let apiPromises = [];
    for(let i=1;i<=apiCalls;i++){
      apiPromises[i-1] = fetch(`${TOP_RATED_MOVIE}${i}`);
    }    
    const allPromises = await Promise.all(apiPromises)
    let count= 0;
    return new Promise((res)=>{
      allPromises.forEach(data => {
          data.json().then(mov => {
              const movieData = dataRestructure(mov.results)    
              movieRef.current.push(...movieData)
              count++
              if(count===apiCalls){
                res();
              }
          })
      })
    })
  }
 
  const fetchData = async () => {
    await callMovieAPI(10) 
    console.log("LOAD movieDispatch",movieRef.current)
    movieDispatch({type:"LOAD", payload:movieRef.current})  
  };

  
  const sortAndFilter = (params=null) => {
    //console.log("----Start: Sort and Filter----")
    const getTrueSort = () => {
      if(params) return params;
      return sortTypeRef.current?.name?"name":sortTypeRef.current?.rating?"rating":sortTypeRef.current?.release?"release":null
    };    
    const sortParam = getTrueSort()    
    movieDispatch({type:"SORT_FILTER", payload:{
      sortParam, setFilters, sortTypeRef
    }})  
  };

  
  useEffect(() => {
    console.log("OnMount");
    if (!movieRef.current.length) {
      fetchData();
    } else {   
      sortAndFilter() 
    }
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
  const noMovieText = movieRef.current.length && !movieState.movies.length ? "No Movies Found" : !movieRef.current.length ? "Loading..." : "";

  return (
    <div className="galleryStyle">
      <h1>Movie Gallery ({movieState.movies.length})</h1>

      <SearchPanel
        moviename={moviename}
        movieSearch={movieSearch}
        sortType={movieState.sortType}
        sortby={sortAndFilter}
        selectGenre={selectGenre}
      />      
      
      <VisitedList visited={visitedRef.current} />

      <hr style={{ borderColor: "grey" }} />

      <div className="tileStyle">
        {movieState.movies.length ? (
          movieState.movies.map((mov, i) => (
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
