import { createContext, useRef, useReducer } from "react";
import initState from "./initState";
import MovieListReducer from "./movieListReducer";

export const MovieContext = createContext();


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
