import {useSelector} from 'react-redux';
/**
 * >? Local & Shared Imports
 */
import Movie from './Movie';

import {movies} from '../data/selectors';
import {useFetchMovies} from '../hooks/useFetchMovies';

import '../styles/movies.scss';

const Movies = ({viewTrailer}) => {
	const {intersectionTargetRef} = useFetchMovies();

	const movieLists = useSelector(movies);

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
