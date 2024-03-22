import React from 'react';

import '../styles/modal.scss';

const Modal = ({closeAction, children, displayClose = true}) => {
	return (
		<div className='modal-container' tabIndex={-1} role='dialog'>
			<div
				aria-hidden={true}
				className='modal-overlay'
				role='presentation'
				onClick={closeAction}
			></div>
			<div className='modal-content-wrapper' role='presentation'>
				{displayClose && (
					<div
						role='button'
						onClick={closeAction}
						aria-label='Click to close dialog'
						className='close-button'
					>
						&times;
					</div>
				)}
				{children}
			</div>
		</div>
	);
};

export default Modal;
