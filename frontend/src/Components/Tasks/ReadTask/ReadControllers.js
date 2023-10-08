import { useContext, useEffect, useState } from 'react';
import classes from './ReadControllers.module.css';
import UserDataContext from '../../../Context/userData-context';

const ReadControllers = (props) => {
	const userDataCtx = useContext(UserDataContext);

	const [isEditValid, setIsEditValid] = useState(false);
	const [isDeleteValid, setIsDeleteValid] = useState(false);
	const [backController, setBackController] = useState(props.isPickedTask);

	const backSelectTaskHandler = () => {
		if (!props.isPickedTask) {
			props.onSetSelectedTask([]);
		} else {
			props.onCancelPickedTask();
		}
	};

	useEffect(() => {
		if (props.selectedTask.length === 1) {
			setIsEditValid(true);
		} else {
			setIsEditValid(false);
			if (props.isPickedTask) {
				setIsEditValid(true);
			} else {
				setIsEditValid(false);
			}
		}

		if (props.selectedTask.length >= 1) {
			setIsDeleteValid(true);
		} else {
			setIsDeleteValid(false);
			if (props.isPickedTask) {
				setIsDeleteValid(true);
			} else {
				setIsDeleteValid(false);
			}
		}
	}, [props.isPickedTask, props.selectedTask]);

	useEffect(() => {
		if (props.isPickedTask) {
			setBackController('Wróć do kafelek');
		} else {
			setBackController('Cofnij zaznaczenie');
		}
	}, [props.isPickedTask]);

	const editModeHandler = () => {
		if (isEditValid) {
			userDataCtx.onEditMode(props.selectedTask);
		}
	};

	return (
		<div className={classes['read-controllers']}>
			<p
				className={`${classes['back-button']}`}
				onClick={backSelectTaskHandler}>
				{backController}
			</p>
			<div className={classes.buttons}>
				<button
					type='button'
					className={`${classes['edit-button']} ${
						!isEditValid ? classes['button-invalid'] : ''
					}`}
					onClick={editModeHandler}>
					Edytuj
				</button>
				<button
					type='button'
					className={`${classes['delete-button']} ${
						!isDeleteValid ? classes['button-invalid'] : ''
					}`}
					onClick={props.onDeleteTaskById}>
					Usuń
				</button>
			</div>
		</div>
	);
};

export default ReadControllers;
