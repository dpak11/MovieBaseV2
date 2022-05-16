
const API_KEY_MOVIE= "?api_key=0fec03f37874864d189b9e4e3c1eec79"
const LANG_MOVIE_US= "&language=en-US"
const MOVIE_API= `${API_KEY_MOVIE}${LANG_MOVIE_US}`
const MOVIEDB_URL= "https://api.themoviedb.org/3"
const MOVIE_DETAIL= `${MOVIEDB_URL}/movie/`
const TOP_RATED_MOVIE= `${MOVIEDB_URL}/movie/top_rated${MOVIE_API}&page=`
const MOVIE_DISCOVER= `${MOVIEDB_URL}/discover/movie${API_KEY_MOVIE}&with_origin_country=IN&with_original_language=`
const THUMBNAIL_PATH = `https://image.tmdb.org/t/p/w500`
const GENRE_LIST = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];



export const GET_VALUES = {API_KEY_MOVIE,LANG_MOVIE_US,MOVIE_API,MOVIEDB_URL,MOVIE_DETAIL,MOVIE_DISCOVER,GENRE_LIST,THUMBNAIL_PATH,TOP_RATED_MOVIE}
