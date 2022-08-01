import { MovieContext } from "../store/MovieContext";
import { useContext, useState, useEffect, useRef } from "react";
import SearchPanel from "./SearchPanel";
import VisitedList from "./VisitedList";
import Movie from "./Movie";
import {GET_VALUES} from "../store/Constants";
import mystyles from "../css/movie-gallery.module.css";

const { THUMBNAIL_PATH,TOP_RATED_MOVIE,GENRE_LIST, API_CALLS_NUM, ADULT_ALL,ADULT_INDIA} = GET_VALUES

const MovieGallery = () => {  
  const [moviename, setMoviename] = useState(""); 
  const { movieRef, tagsRef, visitedRef, currentVisitRef, sortTypeRef, movieDispatch, movieState } =
    useContext(MovieContext);


  const resetRefs = () =>{
    movieRef.current = [];
    tagsRef.current = []
    sortTypeRef.current = []
  } 

  const movieSearch = (e) => {
    setMoviename(e.target.value);
  };

  const nameSearch = () => {
    if (moviename === "") return movieRef.current;
    return movieRef.current.filter((m) =>
      m.name.toLowerCase().includes(moviename.toLowerCase())
    );
  };

  const getTop200 = () => {
    resetRefs();
    fetchData({type:"top200"})
  }

  const getAdultMovies = (loc) => {
    resetRefs();
    fetchData({type:`adult_${loc}`})
  }

  const getRandomMovies = () =>{
    resetRefs();
    let list = Array(20).fill(0).map(() => Math.ceil(Math.random()*500))
    let rndList =  [...new Set(list)]
    let rndPages = rndList.splice(0,10)
    fetchData({type:"random",randomPageList:rndPages})
  }

  const removeMovie = (id) => {
    const confirmDelete = window.confirm("Do you really want to delete?");
    if(!confirmDelete) return;
    movieRef.current = movieRef.current.filter((m) => m.id !== id);
    sortFilter();
  };

  const selectGenre = (genre, target) => {
    const tagIndex = tagsRef.current.indexOf(genre);
    if (tagIndex >= 0) {
      tagsRef.current.splice(tagIndex, 1);
    } else {
      tagsRef.current.push(genre);
    }
    target.classList.toggle("tag-selected");
    sortFilter();
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
   let emptyGenresIndex = [];  // indexes of Movies that have no genres
   let destructured = results.map((item, i) => {
    const {id,title:name,release_date:release,poster_path,genre_ids:genre,vote_average} = item;
    if(genre.length === 0){
      emptyGenresIndex.push(i);
    }
    return {
      id,name,release,
      photos:`${THUMBNAIL_PATH}${poster_path}`,
      genre:getGenres(genre),
      rating:Number(vote_average)*10
    }    
   });
   
   emptyGenresIndex.reverse();
   for(let index of emptyGenresIndex){
    destructured.splice(index,1) // remove movies that do not have genres
   }
   return destructured;
  }
 
  const callMovieAPI = async (apiCalls,params) => {
    let apiPromises = [];
    for(let i=1;i<=apiCalls;i++){      
      let page = params.type ==="random" ? `${TOP_RATED_MOVIE}${params.randomPageList[i-1]}` : params.type ==="adult_india" ? `${ADULT_INDIA}${i}` : params.type ==="adult_all" ? `${ADULT_ALL}${i}` : `${TOP_RATED_MOVIE}${i}`;
      apiPromises[i-1] = fetch(page);
    }    
    const allPromises = await Promise.all(apiPromises)
    let count= 0;
    return new Promise(resolve => {
      allPromises.forEach(data => {
          data.json().then(mov => {
              const movieData = dataRestructure(mov.results)    
              movieRef.current.push(...movieData)
              count++
              if(count===apiCalls){
                resolve();
              }
          })
      })
    })
  }
 
  const fetchData = async (param) => {
    await callMovieAPI(API_CALLS_NUM,param)
    movieDispatch({
      type:"LOAD", 
      payload:{
        movielist:movieRef.current, 
        listType:param.type
      }
    })
  };

  
  const sortFilter = (params=null) => {
    const getSortParam = () => {
      if(params) return params;
      return sortTypeRef.current?.name?"name":sortTypeRef.current?.rating?"rating":sortTypeRef.current?.release?"release":null
    };    
    const sortParam = getSortParam()    
    movieDispatch({type:"SORT_FILTER", payload:{
      sortParam, setFilters, sortTypeRef
    }})  
  };

  
  useEffect(() => {
    if (!movieRef.current.length) {
      getTop200();
    } else {  
      sortFilter() 
    }
  }, []);

  useEffect(() => {
    sortFilter();
  }, [moviename]);

  console.log("rendered gallery", sortTypeRef.current)
  const visitedPage = currentVisitRef.current || "";
  if (visitedPage) {
    const index = visitedRef.current.indexOf(visitedPage);
    if (index >= 0) {
      visitedRef.current.splice(index, 1);
    }
    visitedRef.current.push(visitedPage);
    currentVisitRef.current = null;
  }
  const noMovieText = movieRef.current.length && !movieState.movies.length ? "No Movies Found" : !movieRef.current.length ? "Loading..." : "";

  return (
    <div className={mystyles.galleryStyle}>
      <h1 className={mystyles.gallery}>Movie Gallery ({movieState.movies.length})</h1>
      <p>
        <span className={movieState.mode === "top200" ? mystyles.selected : ""} onClick={getTop200}>
          Top 200
        </span> | <span className={movieState.mode === "random" ? mystyles.selected : ""} onClick={getRandomMovies}>
          Random 200
        </span> | <span className={movieState.mode === "adult_all" ? mystyles.selected : ""} onClick={() => getAdultMovies("all")}>
          18+
        </span> | <span className={movieState.mode === "adult_india" ? mystyles.selected : ""} onClick={() => getAdultMovies("india")}>
          18+(India)
        </span>
      </p>
      <SearchPanel
        moviename={moviename}
        movieSearch={movieSearch}
        sortType={movieState.sortType}
        sortby={sortFilter}
        selectGenre={selectGenre}
      />      
      
      <VisitedList visited={visitedRef.current} />

      <hr style={{ borderColor: "grey" }} />

      <div className={mystyles.tileStyle}>
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

export default MovieGallery;
