import { useContext, useState, useEffect } from 'react';
import classes from './Start.module.css';
import GeneralContext from '../../Context/general-context';
import StartContent from './StartContent';

const Start = () => {
	const [animation, setAnimation] = useState(false);
	const generalCtx = useContext(GeneralContext);

	const handleClickAnywhere = () => {
		setAnimation(true);
		generalCtx.onSkipStart();
	};

	useEffect(() => {
		const clickListener = () => {
			handleClickAnywhere();
		};

		document.addEventListener('click', clickListener);
		document.addEventListener('keyup', clickListener);

		return () => {
			document.removeEventListener('click', clickListener);
			document.removeEventListener('keyup', clickListener);
		};
	}, [generalCtx]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			generalCtx.onSkipStart();
		}, 10000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [generalCtx]);

	return (
		<div
			className={`${classes['start-text']} ${
				animation && classes.closeAnimation
			}`}>
			<StartContent />
		</div>
	);
};

export default Start;
