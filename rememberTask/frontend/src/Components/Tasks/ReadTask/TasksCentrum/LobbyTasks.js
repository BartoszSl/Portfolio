import { Fragment, useEffect, useState } from 'react';
import classes from './LobbyTasks.module.css';
import axios from 'axios';

const LobbyTasks = (props) => {
	const [dataBaseData, setDateBaseData] = useState([]);
	const [selectedTasks, setSelectedTasks] = useState([]);

	const requestToDataBase = () => {
		axios
			.get('http://localhost:3001/select-lobby')
			.then((response) => {
				setDateBaseData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		requestToDataBase();
	}, [props.isDeleted]);

	const refreshHandler = () => {
		requestToDataBase();
	};

	const convertTitle = (title) => {
		const convertedTitle = title.split(' ')[0][0];
		return convertedTitle;
	};

	const convertDate = (date) => {
		const data = new Date(date);
		const rok = data.getFullYear();
		const miesiac = String(data.getMonth() + 1).padStart(2, '0');
		const dzien = String(data.getDate()).padStart(2, '0');

		const betterDate = `${rok}-${miesiac}-${dzien}`;
		return betterDate;
	};

	const convertSvgIcon = (iconType) => {
		if (iconType === 'default') return '';
		if (iconType === 'moon') return 'fa-solid fa-moon';
		if (iconType === 'syringe') return 'fa-solid fa-syringe';
	};

	const convertCategory = (category) => {
		if (category === 'dinner') return 'fa-solid fa-utensils';
		if (category === 'game') return 'fa-solid fa-headset';
		if (category === 'sport') return 'fa-solid fa-volleyball';
		if (category === 'outside') return 'fa-solid fa-sun';
		if (category === 'shopping') return 'fa-solid fa-bag-shopping';
	};

	const onOneClickHandler = (task) => {
		const taskIndex = selectedTasks.findIndex(
			(selectedTask) => selectedTask.id === task.id
		);

		let updatedSelectedTasks;

		if (taskIndex === -1) {
			updatedSelectedTasks = [...selectedTasks, task];
		} else {
			updatedSelectedTasks = [...selectedTasks];
			updatedSelectedTasks.splice(taskIndex, 1);
		}

		setSelectedTasks(updatedSelectedTasks);
		props.onSetSelectedTask(updatedSelectedTasks);
	};

	const onDoubleClickHandler = (task_id, task) => {
		setSelectedTasks([]);
		props.onSetSelectedTask([task]);

		props.onDoubleSelectedTask(task_id);
	};

	useEffect(() => {
		setSelectedTasks(props.isSelectedTask);
	}, [props.isSelectedTask]);

	return (
		<Fragment>
			<div className={classes.refresh} onClick={refreshHandler}>
				<h2>Odśwież</h2>
				<i className='fa-solid fa-arrows-rotate'></i>
			</div>
			<div className={classes['tasks-container']}>
				{dataBaseData
					.slice()
					.reverse()
					.map((task) => (
						<div
							className={`${classes.task} ${
								selectedTasks.find(
									(selectedTask) => selectedTask.id === task.id
								)
									? classes.selected
									: ''
							}`}
							key={task.id}
							id={task.id}
							style={{ backgroundColor: task.color }}
							onClick={() => onOneClickHandler(task)}
							onDoubleClick={() => onDoubleClickHandler(task.id, task)}>
							<i
								className={convertSvgIcon(task.iconType)}
								style={{ color: task.iconColor }}>
								{task.iconType === 'default' && convertTitle(task.title)}
							</i>
							<div className={classes['task-shadow']}>
								<i className={convertCategory(task.type)}></i>
								<div className={classes.hr}></div>
								<div className={classes.time}>
									<p>Termin</p>
									<p>{convertDate(task.date)}</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</Fragment>
	);
};

export default LobbyTasks;
