
const MovieListReducer = (state, action) => {  
    if(action.type === "LOAD"){
      console.log("load reducer")
      return [...action.payload]
    }
    if(action.type === "SORT_FILTER"){
      const {setFilters,sortParam,sortTypeRef,setSortType} = action.payload;
      console.log("Sort Filter Reducer")
      let mov = setFilters()
      if(sortParam){
        const sortTypeData = {
          name: false,
          rating: false,
          release: false,
          [sortParam]: true,
        };
        sortTypeRef.current = sortTypeData;
        setSortType(sortTypeData);
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
      return mov
    }
    return state;
  }

  export default MovieListReducer;