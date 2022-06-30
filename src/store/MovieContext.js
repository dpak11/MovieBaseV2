import { createContext, useRef, useReducer } from "react";
import MovieListReducer from "../reducers/movieListReducer";

export const MovieContext = createContext();

const initState = {
  movies:[],
  sortType:{
    name:false,
    rating:false,
    runtime:false
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
