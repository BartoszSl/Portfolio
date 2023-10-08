import { useContext, useState } from 'react';
import classes from './ReadTask.module.css';
import ReadControllers from './ReadControllers';
import LobbyTasks from './TasksCentrum/LobbyTasks';
import AllTask from './TasksCentrum/AllTask';
import axios from 'axios';
import UserDataContext from '../../../Context/userData-context';

const ReadTask = () => {
	const userCtx = useContext(UserDataContext);

	const [selectedTask, setSelectedTask] = useState([]);
	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [isDeleted, setIsDeleted] = useState(false);

	const onSetSelectedTaskHandler = (value) => {
		setSelectedTask(value);
	};

	const onSetDoubleSelectedTaskHandler = (task_id) => {
		setSelectedTaskId(task_id);
	};

	const cancelSelectedTaskHandler = () => {
		setSelectedTaskId(null);
	};

	const deleteTaskByIdHandler = () => {
		userCtx.onDeleteCommunicat();
		if (selectedTaskId !== null) {
			axios
				.get(`http://localhost:3001/delete-taskById?id=${selectedTaskId}`)
				.catch((error) => {
					console.error(error);
				});
			setSelectedTaskId(null);
		} else if (selectedTask.length >= 1) {
			const ids = selectedTask.map((task) => task.id);
			setIsDeleted(!isDeleted);
			axios
				.post('http://localhost:3001/delete-tasksByManyId', {
					ids: ids,
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<div className={classes['lobby-ReadTask']}>
			<div className={classes.container}>
				{selectedTaskId === null ? (
					<LobbyTasks
						isDeleted={isDeleted}
						isSelectedTask={selectedTask}
						onSetSelectedTask={onSetSelectedTaskHandler}
						onDoubleSelectedTask={onSetDoubleSelectedTaskHandler}
					/>
				) : (
					<AllTask task_id={selectedTaskId} />
				)}
			</div>
			<ReadControllers
				onSetSelectedTask={onSetSelectedTaskHandler}
				selectedTask={selectedTask}
				isPickedTask={selectedTaskId !== null}
				onDeleteTaskById={deleteTaskByIdHandler}
				onCancelPickedTask={cancelSelectedTaskHandler}
			/>
		</div>
	);
};

export default ReadTask;
