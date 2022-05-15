import { createContext, useRef, useReducer } from "react";
import MovieListReducer from "../reducers/movieReducer";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => { 
  const [movieState, movieDispatch] = useReducer(MovieListReducer, {
    movies:[],
    sortType:{
      name:false,
      rating:false,
      runtime:false
    }})
  const movieRef = useRef([]);
  const tagsRef = useRef([]);
  const sortTypeRef = useRef(null);
  const visitedRef = useRef([]);
 
  return (
    <MovieContext.Provider value={{ movieRef, tagsRef, visitedRef, sortTypeRef, movieState, movieDispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
