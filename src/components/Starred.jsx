import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

/**
 * ? Local & Shared Imports
 */
import starredSlice from '../data/starredSlice';
import {starredMovies} from '../data/selectors';
import Movie from './Movie';

import '../styles/starred.scss';

const Starred = ({viewTrailer}) => {
	const starred = useSelector(starredMovies);
	const {clearAllStarred} = starredSlice.actions;
	const dispatch = useDispatch();

	return (
		<div className='starred' data-testid='starred'>
			{starred.length > 0 && (
				<div data-testid='starred-movies' className='starred-movies'>
					<h6 className='header'>Starred movies</h6>
					<div className='movie_grid_wrapper'>
						{starred.map((movie) => (
							<Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
						))}
					</div>

					<footer className='text-center'>
						<button
							className='btn btn-primary'
							onClick={() => dispatch(clearAllStarred())}
						>
							Remove all starred
						</button>
					</footer>
				</div>
			)}

			{starred.length === 0 && (
				<div className='text-center empty-cart'>
					<i className='bi bi-star' />
					<p>There are no starred movies.</p>
					<p>
						Go to <Link to='/'>Home</Link>
					</p>
				</div>
			)}
		</div>
	);
};

export default Starred;
