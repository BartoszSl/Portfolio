import { useContext, useEffect, useState } from 'react';
import classes from './TaskDate.module.css';
import UserDataContext from '../../../../Context/userData-context';

const TaskDate = (props) => {
	const userCtx = useContext(UserDataContext);
	const [pickedDate, setPickedDate] = useState('');
	const [fromTime, setFromTime] = useState('');
	const [toTime, setToTime] = useState('');

	const changeDateHandler = (e) => {
		setPickedDate(e.target.value);
	};

	const changeTimeHandler = (e) => {
		setFromTime(e.target.value);
	};

	const changeToTimeHandler = (e) => {
		setToTime(e.target.value);
	};

	useEffect(() => {
		if (pickedDate !== '' && fromTime !== '') {
			userCtx.onAddDate({
				date: pickedDate,
				from_time: fromTime,
				to_time: toTime,
			});
			console.log('Validate');
		}
	}, [fromTime, toTime, pickedDate]);

	useEffect(() => {
		if (userCtx.isCleared) {
			setPickedDate('');
			setFromTime('');
			setToTime('');
		}
	}, [userCtx.isCleared]);

	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	const minDate = `${year}-${month}-${day}`;

	return (
		<div className={`${props.className} ${classes['task-date']}`}>
			<h3>Data</h3>
			<div className={classes['date-input']}>
				<input
					type='date'
					name=''
					id=''
					min={minDate}
					value={pickedDate === '' ? userCtx.date : pickedDate}
					onChange={changeDateHandler}
					style={{ borderColor: userCtx.mainColor }}
				/>
			</div>
			<div className={classes['timeInputs-container']}>
				<div className={classes['time-input']}>
					<p>From</p>
					<input
						type='time'
						name=''
						id=''
						onChange={changeTimeHandler}
						value={fromTime === '' ? userCtx.from_time : fromTime}
					/>
				</div>
				{userCtx.reminder === 1 && (
					<div className={classes['time-input']}>
						<p>To</p>
						<input
							type='time'
							name=''
							id=''
							onChange={changeToTimeHandler}
							value={toTime === '' ? userCtx.to_time : toTime}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskDate;
