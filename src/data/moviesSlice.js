import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
	const response = await fetch(apiUrl);
	return response.json();
});

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: [],
		has_next: false,
		fetchStatus: '',
		page: 1,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.fulfilled, (state, action) => {
				const {results = [], page = 1, total_pages = 0} = action.payload;

				if (Array.isArray(results) && results.length > 0) {
					if (page === 1) {
						state.movies = results;
					} else {
						state.movies = [...state.movies, ...results];
					}
					state.has_next = page < total_pages;
					state.page = page;
				}
				state.fetchStatus = 'success';
			})
			.addCase(fetchMovies.pending, (state) => {
				state.fetchStatus = 'loading';
			})
			.addCase(fetchMovies.rejected, (state) => {
				state.fetchStatus = 'error';
			});
	},
});

export default moviesSlice;
