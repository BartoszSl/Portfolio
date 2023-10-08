import { useReducer, useState, useEffect, useContext } from 'react';
import classes from './TaskTitle.module.css';
import UserDataContext from '../../../Context/userData-context';

const titleReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.trim() !== '' && action.letters <= 50,
		};
	}

	return { value: '', isValid: false };
};

const TaskTitle = (props) => {
	const userCtx = useContext(UserDataContext);

	const [titleState, dispatchTitle] = useReducer(titleReducer, {
		value: '',
		isValid: false,
	});

	const [availableLetters, setAvailableLetters] = useState(50);

	const titleInputHandler = (e) => {
		const letters = 50 - e.target.value.length;
		dispatchTitle({
			type: 'USER_INPUT',
			val: e.target.value,
			letters: letters,
		});

		if (titleState.isValid) {
			setAvailableLetters(letters);
		}
	};

	const onBlurFunction = () => {
		userCtx.onAddTitle(titleState.value);
		userCtx.onSetTitleValid(titleState.isValid);
	};

	useEffect(() => {
		dispatchTitle({ type: 'CLEAR' });
	}, [userCtx.isCleared]);

	return (
		<div className={classes['task-title']}>
			<input
				type='text'
				className={classes['title-input']}
				maxLength={50}
				placeholder='Tytuł'
				onBlur={onBlurFunction}
				value={titleState.value === '' ? userCtx.title : titleState.value}
				onChange={titleInputHandler}
			/>
			<div className={classes['available-letters']}>
				<span>{availableLetters}</span>
			</div>
		</div>
	);
};

export default TaskTitle;
