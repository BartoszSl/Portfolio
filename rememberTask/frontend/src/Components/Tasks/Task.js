import { Fragment, useContext, useEffect, useState } from 'react';
import BackStart from './BackStart';

import classes from './Task.module.css';
import ChangeFormType from './ChangeFormType';
import UserDataContext from '../../Context/userData-context';
import CreateTask from './CreateTask/CreateTask';
import ReadTask from './ReadTask/ReadTask';
import EventInfo from '../UI/EventInfo';

const Task = (props) => {
	const [isCreate, setIsCreate] = useState(true);

	const userCtx = useContext(UserDataContext);

	const [isCommunicat, setIsCommunicat] = useState(false);
	const [communicatData, setCommunicatData] = useState(false);
	const [number, setNumber] = useState(0);

	const saveData = (e) => {
		if (e.key === 'Enter') {
			return false;
		}
		e.preventDefault();
		userCtx.sendRequest();
	};

	const changeTaskType = () => {
		setIsCreate(!isCreate);
		userCtx.onChangeTaskTypeHandler();
	};

	useEffect(() => {
		if (userCtx.isEditMode) {
			setIsCreate(true);
		} else if (!userCtx.isEditMode) {
			setIsCreate(false);
		}
	}, [userCtx.isEditMode]);

	useEffect(() => {
		if (userCtx.isSuccesedAdded) {
			setIsCommunicat(true);
			setCommunicatData('dodano');
			setNumber(0);

			setTimeout(() => {
				setIsCommunicat(false);
			}, 6000);
		}
		if (userCtx.isSuccesedEdited) {
			setIsCommunicat(true);
			setCommunicatData('edytowano');
			setNumber(0);

			setTimeout(() => {
				setIsCommunicat(false);
			}, 6000);
		}
		if (userCtx.isSuccesedDeleted) {
			console.log(userCtx.isSuccesedDeleted);
			setIsCommunicat(true);
			setCommunicatData('usunięto');
			setNumber(1);

			setTimeout(() => {
				setIsCommunicat(false);
			}, 6000);
		}
	}, [
		userCtx.isSuccesedAdded,
		userCtx.isSuccesedDeleted,
		userCtx.isSuccesedEdited,
	]);

	return (
		<Fragment>
			<BackStart />
			<form className={`${classes.form}`} onSubmit={saveData}>
				<ChangeFormType onChangeType={changeTaskType} />
				{isCreate ? <CreateTask /> : <ReadTask />}
			</form>
			{isCommunicat && <EventInfo type={communicatData} number={number} />}
		</Fragment>
	);
};

export default Task;
