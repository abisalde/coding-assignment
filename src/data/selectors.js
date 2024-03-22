export const movies = (state) => state.movies.movies; // Selector for Movies
export const starredMovies = (state) => state.starred.starredMovies; // Selector for Starred Movies
export const watchLaterMovies = (state) => state.watchLater.watchLaterMovies; // Selector for Watch Later Movies
export const page = (state) => state.movies.page; // Selector for a Page
export const hasNext = (state) => state.movies.has_next; // Selector for a Next Page
