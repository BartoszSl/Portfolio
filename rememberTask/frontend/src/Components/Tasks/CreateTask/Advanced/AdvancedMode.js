import { useContext, useEffect, useState } from 'react';
import TaskIcon from './TaskIcon';
import TaskFriends from './TaskFriends';
import TaskDescription from './TaskDescription';

import classes from './AdvancedMode.module.css';
import GeneralContext from '../../../../Context/general-context';

const AdvancedMode = (props) => {
	const geneCtx = useContext(GeneralContext);

	const [isAnmation, setIsAnimation] = useState(false);

	useEffect(() => {
		setIsAnimation(props.isChangedMode);
	}, [props.isChangedMode]);

	useEffect(() => {
		setIsAnimation(!geneCtx.isGeneral);
	}, [geneCtx.isGeneral]);

	return (
		<div
			className={`${classes['advanced-mode']} ${
				isAnmation ? classes.sectionUp : classes.sectionDown
			}
			`}>
			<TaskIcon />
			<TaskFriends />
			<TaskDescription />
		</div>
	);
};

export default AdvancedMode;
