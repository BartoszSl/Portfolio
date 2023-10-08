import classes from './TaskDescription.module.css';

const TaskDescription = () => {
	return (
		<div className={classes['task-description']}>
			<h3>Opis</h3>
			<div className={classes.off}>
				<p>Chwilowo wyłączone </p>
				<i className='fa-regular fa-circle-xmark'></i>
			</div>
		</div>
	);
};

export default TaskDescription;
