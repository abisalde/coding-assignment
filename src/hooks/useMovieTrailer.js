import {useState} from 'react';

/**
 *
 *
 * @returns { videoKeyViewStatus, closeMovieTrailer, viewMovieTrailer }
 * @function viewMovieTrailer
 * @function closeMovieTrailer
 */

/**
 *  @description
 * This adoption is similar to enum in TypeScript
 * @enum TrailerStatus
 */

/**
 * ? Local & Shared Imports
 */
import {ENDPOINT, API_KEY} from '../constants';

export const TrailerStatus = {
	LOADING: 'loading',
	IDLE: 'idle',
	SUCCESS: 'success',
	UNAVAILABLE: 'unavailable',
};

const initialState = {
	status: TrailerStatus.IDLE,
	videoKey: undefined,
};

export const useMovieTrailer = () => {
	const [videoKeyViewStatus, setVideoKeyViewStatus] = useState(initialState);

	const viewMovieTrailer = (movie) => {
		setVideoKeyViewStatus((prev) => ({...prev, status: TrailerStatus.LOADING}));
		void getMovie(movie.id);
	};

	const getMovie = async (id) => {
		const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

		try {
			const response = await fetch(URL).then((response) => response.json());

			if (typeof response !== 'undefined' && response.videos.results.length) {
				const videoTrailer = response.videos.results.find(
					(video) => video.type === 'Trailer'
				);
				const videoKey = videoTrailer
					? videoTrailer.key
					: response.videos.results[0].key;

				setVideoKeyViewStatus({
					videoKey,
					status: videoKey ? TrailerStatus.SUCCESS : TrailerStatus.UNAVAILABLE,
				});
			}
		} catch (error) {
			throw new Error('Error from fetching movie trailer ' + error?.message);
		}
	};

	const closeMovieTrailer = (e) => {
		e.stopPropagation();
		setVideoKeyViewStatus(initialState);
	};

	return {
		closeMovieTrailer,
		videoKeyViewStatus,
		viewMovieTrailer,
	};
};
