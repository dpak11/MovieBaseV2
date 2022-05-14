import { createContext, useState, useRef } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => { 
  const movieRef = useRef([]);
  const tagsRef = useRef([]);
  const sortTypeRef = useRef(null);
  const visitedRef = useRef([]);
 
  return (
    <MovieContext.Provider value={{ movieRef, tagsRef, visitedRef,sortTypeRef }}>
      {children}
    </MovieContext.Provider>
  );
};
