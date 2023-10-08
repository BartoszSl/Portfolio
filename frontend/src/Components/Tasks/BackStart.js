import { useContext, useState, useEffect } from 'react';
import GeneralContext from '../../Context/general-context';

const BackStart = () => {
	const generalCtx = useContext(GeneralContext);
	const [backTickCount, setBackTickCount] = useState(0);

	const handleKeyDown = (e) => {
		if (e.key === '`') {
			setBackTickCount((prevCount) => prevCount + 1);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	useEffect(() => {
		const identifier = setTimeout(() => {
			if (backTickCount === 2) {
				generalCtx.onBackToStart();
			}
		}, 500);

		return () => {
			clearTimeout(identifier);
		};
	}, [backTickCount, generalCtx]);
};

export default BackStart;
