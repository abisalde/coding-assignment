import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useSearchParams, createSearchParams} from 'react-router-dom';

/**
 * ? Local & Shared Imports
 */

import {ENDPOINT_DISCOVER, ENDPOINT_SEARCH} from '../constants';
import {fetchMovies} from '../data/moviesSlice';

/**
 *
 * @returns  {fetchMoviesWithQuery, searchMovies }
 *  @function fetchMoviesWithQuery
 *  @function searchMovies
 */

export const useFetchMovies = () => {
	const dispatch = useDispatch();

	const [, setSearchParams] = useSearchParams();

	const fetchMoviesWithQuery = useCallback(
		(query = '', page = 1) => {
			const params = {
				query,
				page,
			};
			const queryParams = new URLSearchParams(params);

			const apiURL = query !== '' ? ENDPOINT_SEARCH : ENDPOINT_DISCOVER;
			setSearchParams(query !== '' ? createSearchParams({search: query}) : '');

			const fetchURL = `${apiURL}&${queryParams.toString()}`;

			dispatch(fetchMovies(fetchURL));
		},
		[dispatch, setSearchParams]
	);

	const searchMovies = useCallback(
		(query) => {
			debounce(fetchMoviesWithQuery(query), 350);
		},
		[fetchMoviesWithQuery]
	);

	return {
		fetchMoviesWithQuery,
		searchMovies,
	};
};

const debounce = (fn, delay) => {
	let debounceTimer;
	return (...args) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};
