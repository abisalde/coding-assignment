import {useCallback, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
/**
 * >? Local & Shared Imports
 */
import Movie from './Movie';

import {hasNext, movies, page} from '../data/selectors';
import {useFetchMovies} from '../hooks/useFetchMovies';

import '../styles/movies.scss';

const Movies = ({viewTrailer}) => {
	const {fetchMoviesWithQuery} = useFetchMovies();
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('search');

	const movieLists = useSelector(movies);
	const hasNextPage = useSelector(hasNext);
	const pageCount = useSelector(page);

	const observerRef = useRef(null);
	const intersectionTargetRef = useRef(null);

	const loadMoreMovies = useCallback(
		(node) => {
			let query;

			if (node && node[0].isIntersecting && hasNextPage) {
				if (searchQuery) {
					query = searchQuery;
				} else {
					query = '';
				}
				fetchMoviesWithQuery(query, pageCount + 1);
				observerRef.current?.disconnect();
			}
		},
		[hasNextPage, fetchMoviesWithQuery, pageCount, searchQuery]
	);

	useEffect(() => {
		fetchMoviesWithQuery();
	}, []);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(loadMoreMovies, {
			threshold: 1.0,
			root: null,
			rootMargin: '10px',
		});
		if (observerRef.current && intersectionTargetRef.current) {
			observerRef.current?.observe(intersectionTargetRef.current);
		}
		return () => {
			if (observerRef.current) {
				observerRef.current?.disconnect();
			}
		};
	}, [loadMoreMovies]);

	return (
		<div data-testid='movies' className='movie_grid_wrapper'>
			{movieLists?.map((movie) => {
				return <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />;
			})}
			<div ref={intersectionTargetRef}></div>
		</div>
	);
};

export default Movies;
