const API_CALLS_NUM = 10
const MOVIEDB_URL= "https://api.themoviedb.org/3"
const API_KEY_MOVIE= "?api_key=0fec03f37874864d189b9e4e3c1eec79"
const MOVIE_API= `${API_KEY_MOVIE}&language=en-US`
const MOVIE_DETAIL= `${MOVIEDB_URL}/movie/`
const TOP_RATED_MOVIE= `${MOVIEDB_URL}/movie/top_rated${MOVIE_API}&page=`
const THUMBNAIL_PATH = `https://image.tmdb.org/t/p/w500`
const GENRE_LIST = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];
const MOVIE_DISCOVER= `${MOVIEDB_URL}/discover/movie${API_KEY_MOVIE}&language=en-US&sort_by=popularity.desc&certification_country=`;
const ADULT_ALL = `${MOVIE_DISCOVER}US&certification=NC-17&page=`
const ADULT_INDIA = `${MOVIE_DISCOVER}IN&with_origin_country=IN&certification=A&page=`

export const GET_VALUES = {API_CALLS_NUM,MOVIE_API,MOVIE_DETAIL,GENRE_LIST,THUMBNAIL_PATH,TOP_RATED_MOVIE,ADULT_ALL,ADULT_INDIA}

// https://api.themoviedb.org/3/discover/movie?api_key=0fec03f37874864d189b9e4e3c1eec79&language=en-US&sort_by=popularity.desc&certification_country=IN&with_origin_country=IN&certification=A&with_original_language=ta
// https://api.themoviedb.org/3/discover/movie?api_key=0fec03f37874864d189b9e4e3c1eec79&language=en-US&sort_by=popularity.desc&certification_country=US&certification=NC-17&certification.gte=R&page=
// https://developers.themoviedb.org/3/certifications/get-movie-certifications