import { createContext, useState, useRef } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const movieRef = useRef([]);
  const tagsRef = useRef([]);
  const visitedRef = useRef([]);
  return (
    <MovieContext.Provider value={{ movies, setMovies, movieRef, tagsRef, visitedRef }}>
      {children}
    </MovieContext.Provider>
  );
};
