import {Routes, Route} from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import Header from './components/Header';
import Movies from './components/Movies';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import YoutubePlayer from './components/YoutubePlayer';

import {useMovieTrailer} from './hooks/useMovieTrailer';
import './app.scss';

const App = () => {
	const {viewMovieTrailer, closeMovieTrailer, videoKeyViewStatus} =
		useMovieTrailer();

	return (
		<div className='App'>
			<Header />

			<YoutubePlayer
				closeTrailer={closeMovieTrailer}
				status={videoKeyViewStatus.status}
				videoKey={videoKeyViewStatus.videoKey}
			/>

			<div className='container'>
				<Routes>
					<Route path='/' element={<Movies viewTrailer={viewMovieTrailer} />} />
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
