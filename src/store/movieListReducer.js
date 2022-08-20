import initState from "./initState";

const MovieListReducer = (state, action) => {  
    if(action.type === "LOAD"){
      const {movielist, mode} = action.payload
      return {...state, movies: [...movielist], sortType:{...initState.sortType}, mode}
    }
    if(action.type === "SORT_FILTER"){
      return doSortAndFilter(state,action)      
    }
    return state;
  }

  function doSortAndFilter(state,{payload}){
    const {setFilters,sortParam,sortTypeRef} = payload;
      let mov = setFilters()
      let currentState = {...state}            
      if(sortParam){
        const sortTypeData = {
          ...initState.sortType,
          [sortParam]: {isSet:true,asc: !currentState.sortType[sortParam].asc},
        };
        currentState.sortType = sortTypeData
        sortTypeRef.current = sortTypeData;
      }
      if (sortParam === "release") {
        mov = mov.map((m) => { 
          let r = m.release.split("-")
          r.pop();
          const releaseNumeric = Number(r.join(""));
          return {
          ...m,releaseNumeric        
        }});
        if(currentState.sortType.release.asc){
          mov.sort((a, b) => a.releaseNumeric - b.releaseNumeric);
        }else{
          mov.sort((a, b) => b.releaseNumeric - a.releaseNumeric);
        }
        
      }
      if (sortParam === "name") {
        let returnNum1 = currentState.sortType.name.asc ? 1 : -1;
        let returnNum2 = returnNum1 === -1 ? 1 : -1;
        mov.sort((a, b) => {
          if (a.name < b.name) return returnNum1;
          if (a.name > b.name) return returnNum2;
          return 0;
        });
      }
      if (sortParam === "rating") {
        if(currentState.sortType.rating.asc){
          mov.sort((a, b) => b.rating - a.rating);
        }else{
          mov.sort((a, b) => a.rating - b.rating);
        }
      }
      currentState.movies = mov
      return currentState
  }
  

  export default MovieListReducer;