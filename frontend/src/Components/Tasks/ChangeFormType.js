import { useState } from 'react';

import classes from './ChangeFormType.module.css';

const ChangeFormType = (props) => {
	const [taskType, setTaskType] = useState('Stwórz zadanie');

	const changeTask = () => {
		props.onChangeType();
		if (taskType === 'Stwórz zadanie') {
			setTaskType('Czytaj Zadania');
		} else {
			setTaskType('Stwórz zadanie');
		}
	};

	return (
		<div className={classes['pick-type']}>
			<h2>{taskType}</h2>
			<i className='fa-solid fa-sliders' onClick={changeTask}></i>
		</div>
	);
};

export default ChangeFormType;
