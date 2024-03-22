import ReactPlayer from 'react-player';

/**
 * ? Local & Shared Imports
 */
import Modal from './Modal';
import {TrailerStatus} from '../hooks/useMovieTrailer';

const YoutubePlayer = ({status, closeTrailer, videoKey}) => {
	if (status === TrailerStatus.IDLE) return null;

	return (
		<Modal closeAction={closeTrailer}>
			{status === TrailerStatus.LOADING ? (
				<div className='video-player-content'>
					<h6>Loading trailer ........</h6>
				</div>
			) : status === TrailerStatus.SUCCESS ? (
				<ReactPlayer
					className='video-player'
					url={`https://www.youtube.com/watch?v=${videoKey}`}
					controls={true}
					playing={true}
					data-testid='youtube-player'
					width='100%'
					height='100%'
				/>
			) : (
				<div className='video-player-content'>
					<h6>no trailer available. Try another movie</h6>
				</div>
			)}
		</Modal>
	);
};

export default YoutubePlayer;
