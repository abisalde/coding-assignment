import {useEffect} from 'react';
import {
	Routes,
	Route,
	createSearchParams,
	useSearchParams,
	useNavigate,
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import 'reactjs-popup/dist/index.css';
import {fetchMovies} from './data/moviesSlice';
import {ENDPOINT_SEARCH, ENDPOINT_DISCOVER} from './constants';
import Header from './components/Header';
import Movies from './components/Movies';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';

import {useMovieTrailer} from './hooks/useMovieTrailer';
import './app.scss';
import YoutubePlayer from './components/YoutubePlayer';

const App = () => {
	const state = useSelector((state) => state);
	const {movies} = state;
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get('search');
	const navigate = useNavigate();

	const getSearchResults = (query) => {
		if (query !== '') {
			dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query));
			setSearchParams(createSearchParams({search: query}));
		} else {
			dispatch(fetchMovies(ENDPOINT_DISCOVER));
			setSearchParams();
		}
	};

	const searchMovies = (query) => {
		navigate('/');
		getSearchResults(query);
	};

	const getMovies = () => {
		if (searchQuery) {
			dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery));
		} else {
			dispatch(fetchMovies(ENDPOINT_DISCOVER));
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	const {viewMovieTrailer, closeMovieTrailer, videoKeyViewStatus} =
		useMovieTrailer();

	return (
		<div className='App'>
			<Header
				searchMovies={searchMovies}
				searchParams={searchParams}
				setSearchParams={setSearchParams}
			/>

			<YoutubePlayer
				closeTrailer={closeMovieTrailer}
				status={videoKeyViewStatus.status}
				videoKey={videoKeyViewStatus.videoKey}
			/>

			<div className='container'>
				<Routes>
					<Route
						path='/'
						element={<Movies movies={movies} viewTrailer={viewMovieTrailer} />}
					/>
					<Route
						path='/starred'
						element={<Starred viewTrailer={viewMovieTrailer} />}
					/>
					<Route
						path='/watch-later'
						element={<WatchLater viewTrailer={viewMovieTrailer} />}
					/>
					<Route
						path='*'
						element={<h1 className='not-found'>Page Not Found</h1>}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
