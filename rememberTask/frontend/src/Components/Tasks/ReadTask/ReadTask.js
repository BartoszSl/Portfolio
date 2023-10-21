import { useContext, useState } from 'react';
import classes from './ReadTask.module.css';
import ReadControllers from './ReadControllers';
import LobbyTasks from './TasksCentrum/LobbyTasks';
import AllTask from './TasksCentrum/AllTask';
import UserDataContext from '../../../Context/userData-context';
import useHttp from '../../../hooks/use-http';

const ReadTask = () => {
	const userCtx = useContext(UserDataContext);

	const [selectedTask, setSelectedTask] = useState([]);
	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [isDeleted, setIsDeleted] = useState(false);
	const [tasks, setTasks] = useState([]);

	const { sendRequest: deleteTask } = useHttp();

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

		const transformTasks = (tasksObj) => {
			const loadedTasks = [];

			for (const taskKey in tasksObj) {
				loadedTasks.push(tasksObj[taskKey]);
			}

			setTasks(loadedTasks);
		};

		if (selectedTaskId !== null) {
			deleteTask(
				{
					url: `http://localhost:3001/delete-taskById?id=${selectedTaskId}`
				},
				transformTasks
			);
			setSelectedTaskId(null);
		} else if (selectedTask.length >= 1) {
			const ids = selectedTask.map((task) => task.id);
			setIsDeleted(!isDeleted);

			deleteTask(
				{
					url: 'http://localhost:3001/delete-tasksByManyId',
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: ids,
				},
				transformTasks
			);
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
						tasks={tasks}
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
