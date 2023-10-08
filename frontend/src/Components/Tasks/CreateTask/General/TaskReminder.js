import { useContext, useEffect, useState } from 'react';
import classes from './TaskReminder.module.css';
import UserDataContext from '../../../../Context/userData-context';

const TaskReminder = (props) => {
	const userCtx = useContext(UserDataContext);
	const [eventIsActive, setEventIsActive] = useState(userCtx.reminder === 0);

	const changeToEvent = () => {
		setEventIsActive(true);
		userCtx.onAddReminder(0);
	};

	const changeToReminder = () => {
		setEventIsActive(false);
		userCtx.onAddReminder(1);
	};

	useEffect(() => {
		if (userCtx.isCleared) {
			userCtx.onAddReminder(0);
			setEventIsActive(true);
		}
	}, [userCtx, userCtx.isCleared]);

	useEffect(() => {
		if (userCtx.isEditMode) {
			setEventIsActive(userCtx.reminder === 0);
		}
	}, [userCtx.isEditMode, userCtx.reminder]);

	return (
		<div className={`${props.className} ${classes['task-reminder']}`}>
			<div className={classes['reminder-toggle']}>
				<div
					className={`${classes.indicator} ${classes.event} ${
						eventIsActive && classes.active
					}`}
					onClick={changeToEvent}>
					<span>Wydarzenie</span>
				</div>
				<div
					className={`${classes.indicator} ${classes.reminder} ${
						!eventIsActive && classes.active
					}`}
					onClick={changeToReminder}>
					<span>Przypomnienie</span>
				</div>
			</div>
		</div>
	);
};

export default TaskReminder;
