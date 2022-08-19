import { createContext, useRef, useReducer } from "react";
import MovieListReducer from "./movieListReducer";

export const MovieContext = createContext();

const initState = {
  movies:[],
  mode:"top200",
  sortType:{
    name:{isSet:false,asc:true},
    rating:{isSet:false,asc:true},
    release:{isSet:false,asc:true}
  }};

export const MovieProvider = ({ children }) => { 
  const [movieState, movieDispatch] = useReducer(MovieListReducer, initState)
  const movieRef = useRef([]);
  const tagsRef = useRef([]);
  const sortTypeRef = useRef(null);
  const visitedRef = useRef([]);
  const currentVisitRef = useRef(null)
 
  return (
    <MovieContext.Provider value={{ movieRef, tagsRef, visitedRef, currentVisitRef, sortTypeRef, movieState, movieDispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
