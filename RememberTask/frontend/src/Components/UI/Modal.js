import { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const CommunicatOverlay = (props) => {
	const [endCommunicat, setEndComunicat] = useState(false);
	const [backgroundColor, setBackgroundColor] = useState(true);

	useEffect(() => {
		if (!endCommunicat) {
			setTimeout(() => {
				setEndComunicat(true);
			}, 3200);
		}
	}, [endCommunicat]);

	useEffect(() => {
		if (props.type === 'edytowano' || props.type === 'dodano') {
			setBackgroundColor(true);
		} else if (props.type === 'usunięto') {
			setBackgroundColor(false);
		}
	}, [backgroundColor, props.type]);

	const convertColor = (number) => {
		if (number === 0) {
			return '#59b90e';
		} else if (number === 1) {
			return '#ff5964';
		}
	};

	return (
		<div
			className={`${classes.container} ${
				endCommunicat ? classes.invisible : ''
			}`}
			style={{ backgroundColor: convertColor(props.number) }}>
			<div className={`${classes.inner}`}></div>
			<p>Pomyślnie {props.type} zadanie</p>
		</div>
	);
};

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<CommunicatOverlay type={props.type} number={props.number} />,
				document.getElementById('communicat-root')
			)}
		</Fragment>
	);
};

export default Modal;
