import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';
import GeneralContext from './general-context';
import axios from 'axios';
import useHttp from '../hooks/use-http';

const UserDataContext = createContext({
	title: null,
	isTitleValid: false,
	reminder: null,
	mainColor: null,
	type: null,
	icon: {
		color: null,
		type: null,
	},
	date: {
		date: null,
		from_time: null,
		to_time: null,
	},
	friends: null,
});

const dateReducer = (state, action) => {
	if (action.type === 'USER_EVENT') {
		return {
			date: action.date,
			from_time: action.from_time,
			to_time: '',
			isValid: true,
		};
	}
	if (action.type === 'USER_REMINDER') {
		return {
			date: action.date,
			from_time: action.from_time,
			to_time: action.to_time,
			isValid: true,
		};
	}
	return { date: '', from_time: '', to_time: null, isValid: false };
};

const iconReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { color: action.color, type: action.paternType, isValid: true };
	}
	return { color: '#FFFFFF', type: 'default', isValid: true };
};

export const UserDataContextProvider = (props) => {
	const geneCtx = useContext(GeneralContext);

	const [dateState, dispatchDate] = useReducer(dateReducer, {
		date: '',
		from_time: '',
		to_time: null,
		isValid: false,
	});

	const [iconState, dispatchIcon] = useReducer(iconReducer, {
		color: '#FFFFFF',
		type: 'default',
		isValid: true,
	});

	const [isAllCorrect, setIsAllCorrect] = useState(false);

	const [title, setTitle] = useState('');
	const [mainColor, setMainColor] = useState('#83b8df');
	const [categoryType, setCategoryType] = useState('dinner');
	const [reminder, setReminder] = useState(0);
	const [friendsList, setFriendsList] = useState([]);
	const [isTitleValid, setIsTitleValid] = useState(false);
	const [clear, setClear] = useState(false);
	const [isCreateMode, setIsCreateMode] = useState(true);
	const [isEditMode, setIsEditMode] = useState(false);
	const [editData, setEditData] = useState([]);
	const [tasks, setTasks] = useState([]);

	const [isSuccesedAdded, setIsSuccesedAdded] = useState(false);
	const [isSuccesedEdited, setIsSuccesedEdited] = useState(false);
	const [isSuccesedDeleted, setIsSuccesedDeleted] = useState(false);

	const { sendRequest: requestToDataBase } = useHttp();

	const addTitle = (data) => {
		setTitle(data);
	};

	const setTitleIsValidHandler = (value) => {
		setIsTitleValid(value);
	};

	const addReminder = (reminder) => {
		setReminder(reminder);
	};

	const addMainColor = (hexColor) => {
		setMainColor(hexColor);
	};

	const addCategoryType = (categoryTypeValue) => {
		setCategoryType(categoryTypeValue);
	};

	const addIconDetails = (iconData) => {
		dispatchIcon({
			type: 'USER_INPUT',
			color: iconData.color,
			paternType: iconData.type,
		});
	};

	const addDate = (details) => {
		if (reminder === 0) {
			dispatchDate({
				type: 'USER_EVENT',
				date: details.date,
				from_time: details.from_time,
			});
		} else {
			dispatchDate({
				type: 'USER_REMINDER',
				date: details.date,
				from_time: details.from_time,
				to_time: details.to_time,
			});
		}
	};

	const addFriend = (friend) => {
		setFriendsList([...friendsList, { id: Math.random(), value: friend }]);
	};

	const removeFriend = (id) => {
		const updatedNames = friendsList.filter((user) => user.id !== id);
		setFriendsList(updatedNames);
	};

	useEffect(() => {
		if (
			title.trim().length > 0 &&
			dateState.isValid &&
			categoryType !== '' &&
			iconState.isValid
		) {
			setIsAllCorrect(true);
		} else {
			setIsAllCorrect(false);
		}
	}, [categoryType, dateState.isValid, iconState.isValid, title]);

	const onClear = () => {
		setTitle('');
		setIsTitleValid(false);
		setReminder(0);
		setMainColor('#83b8df');
		setCategoryType('dinner');
		dispatchIcon({ type: 'CLEAR' });
		dispatchDate({ type: 'CLEAR' });
		setFriendsList([]);

		setClear(true);
		setTimeout(() => {
			setClear(false);
		}, 500);
	};

	const sendRequestToDataBaseHandler = () => {
		const USER_DATA = {
			title: title,
			reminder: reminder,
			mainColor: mainColor,
			type: categoryType,
			icon: {
				color: iconState.color,
				type: iconState.type,
			},
			date: {
				date: dateState.date,
				from_time: dateState.from_time,
				to_time: reminder === 1 ? dateState.to_time : null,
			},
			friends: friendsList,
		};

		if (isAllCorrect) {
			if (!isEditMode) {
				try {
					setIsCreateMode(true);

					onClear();
					geneCtx.onClearButton();
					setIsSuccesedAdded(true);

					setTimeout(() => {
						setIsSuccesedAdded(false);
					}, 6000);

					requestToDataBase({
						url: 'http://localhost:3001/addRequest',
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: USER_DATA,
					});
				} catch (err) {
					console.error(err);
				}
			}
			if (isEditMode) {
				console.log(USER_DATA);
				console.log(editData[0].id);

				requestToDataBase({
					url: 'http://localhost:3001/udpate-task',
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: [editData[0].id, USER_DATA],
				});

				setIsCreateMode(false);
				setIsEditMode(false);
				setIsSuccesedEdited(true);

				setTimeout(() => {
					setIsSuccesedEdited(false);
				}, 6000);
			}
		} else {
			console.error('Incorecct Data.');
		}
	};

	console.log(isEditMode);

	const editFormHandler = (data) => {
		const transformTasks = (tasksObj) => {
			const loadedTasks = [];

			for (const taskKey in tasksObj) {
				loadedTasks.push(tasksObj[taskKey]);
			}

			setEditData(loadedTasks);
		};

		requestToDataBase(
			{
				url: `http://localhost:3001/select-taskToEdit?id=${data[0].id}`,
			},
			transformTasks
		);

		setIsCreateMode(true);
		setIsEditMode(true);
	};

	useEffect(() => {
		const convertDate = (date) => {
			const data = new Date(date);
			const rok = data.getFullYear();
			const miesiac = String(data.getMonth() + 1).padStart(2, '0');
			const dzien = String(data.getDate()).padStart(2, '0');

			const betterDate = `${rok}-${miesiac}-${dzien}`;
			return betterDate;
		};

		if (isCreateMode && editData.length === 1) {
			setTitle(editData[0].title);
			setIsTitleValid(true);
			setReminder(editData[0].reminder);
			setMainColor(editData[0].color);
			setCategoryType(editData[0].type);
			dispatchIcon({
				type: 'USER_INPUT',
				color: editData[0].iconColor,
				paternType: editData[0].iconType,
			});

			if (reminder === 0) {
				dispatchDate({
					type: 'USER_EVENT',
					date: convertDate(editData[0].date),
					from_time: editData[0].from_time,
				});
			} else {
				dispatchDate({
					type: 'USER_REMINDER',
					date: convertDate(editData[0].date),
					from_time: editData[0].from_time,
					to_time: editData[0].to_time,
				});
			}

			if (editData[0].name !== null)
				setFriendsList([
					{ id: editData[0].friends_id, value: editData[0].name },
				]);
		}
	}, [editData, isCreateMode, reminder]);

	const changeTaskTypeHandler = (value) => {
		setIsCreateMode(value);
		setIsEditMode(value);
		setEditData([]);
		onClear();
	};

	const deleteCommunicat = () => {
		setIsSuccesedDeleted(true);

		setTimeout(() => {
			setIsSuccesedDeleted(false);
		}, 6000);
	};

	return (
		<UserDataContext.Provider
			value={{
				title: title,
				isTitleValid: isTitleValid,
				onAddTitle: addTitle,
				onSetTitleValid: setTitleIsValidHandler,
				reminder: reminder,
				onAddReminder: addReminder,
				mainColor: mainColor,
				onAddMainColor: addMainColor,
				category: categoryType,
				onAddCategory: addCategoryType,
				iconType: iconState.type,
				iconColor: iconState.color,
				onAddIcon: addIconDetails,
				date: dateState.date,
				from_time: dateState.from_time,
				to_time: dateState.to_time,
				onAddDate: addDate,
				friendList: friendsList,
				onAddFriend: addFriend,
				onRemoveFriend: removeFriend,
				sendRequest: sendRequestToDataBaseHandler,
				isAllCorrect: isAllCorrect,
				onClearHandler: onClear,
				isCleared: clear,
				onEditMode: editFormHandler,
				isEditMode: isEditMode,
				isCreateMode: isCreateMode,
				onChangeTaskTypeHandler: changeTaskTypeHandler,
				isSuccesedAdded: isSuccesedAdded,
				isSuccesedEdited: isSuccesedEdited,
				onDeleteCommunicat: deleteCommunicat,
				isSuccesedDeleted: isSuccesedDeleted,
			}}>
			{props.children}
		</UserDataContext.Provider>
	);
};

export default UserDataContext;
