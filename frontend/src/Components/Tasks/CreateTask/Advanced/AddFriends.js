import { useContext, useEffect, useReducer } from 'react';
import classes from './AddFriends.module.css';
import GeneralContext from '../../../../Context/general-context';
import UserDataContext from '../../../../Context/userData-context';

const friendReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 1 };
	}

	if (action.type === 'USER_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 1 };
	}

	return {
		value: '',
		isValid: false,
	};
};

const AddFriends = (props) => {
	const [friendState, dispatchFriend] = useReducer(friendReducer, {
		value: '',
		isValid: null,
	});

	const geneCtx = useContext(GeneralContext);
	const userCtx = useContext(UserDataContext);

	const friendChangeHandler = (e) => {
		dispatchFriend({ type: 'USER_INPUT', val: e.target.value });
	};

	const validateFriendHandler = () => {
		dispatchFriend({ type: 'USER_BLUR' });
	};

	useEffect(() => {
		const keydownHandler = (e) => {
			if (e.key === 'Enter' && friendState.isValid && geneCtx.isAddFriendsOn) {
				e.preventDefault();
				geneCtx.onChangeToOff();
				userCtx.onAddFriend(friendState.value);
			}
		};

		document.addEventListener('keydown', keydownHandler);

		return () => {
			document.removeEventListener('keydown', keydownHandler);
		};
	}, [friendState.isValid, friendState.value, geneCtx, props, userCtx]);

	return (
		<div className={classes.shadow}>
			<div className={classes['addFriends-form']}>
				<p className={classes['wtd-text']}>Wprowadź imię</p>
				<input
					id='addFriends'
					type='text'
					value={friendState.value}
					onChange={friendChangeHandler}
					onBlur={validateFriendHandler}
				/>
				<p>
					Naciśnij "<span>Enter</span>" aby zapisać
				</p>
			</div>
		</div>
	);
};

export default AddFriends;
