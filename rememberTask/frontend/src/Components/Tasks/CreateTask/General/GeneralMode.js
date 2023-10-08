import { Fragment } from 'react';
import TaskReminder from './TaskReminder';
import TaskColor from './TaskColor';
import TaskCategoryType from './TaskCategoryType';
import TaskDate from './TaskDate';

import classes from './GeneralMode.module.css';

const GeneralType = (props) => {
	return (
		<Fragment>
			<TaskReminder
				className={props.isChangedMode && classes.animationSlideToLeft}
			/>
			<TaskColor
				className={props.isChangedMode && classes.animationSlideToRight}
			/>
			<TaskCategoryType
				className={props.isChangedMode && classes.animationSlideToLeft}
			/>
			<TaskDate
				className={props.isChangedMode && classes.animationSlideToRight}
			/>
		</Fragment>
	);
};

export default GeneralType;
