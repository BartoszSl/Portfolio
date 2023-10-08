import { createContext, useEffect, useState } from 'react';

const GeneralContext = createContext({
	isFinishStart: false,
	isGeneral: true,
	isTitleValid: false,
	isAddFriendsOn: false,
	usersData: [],
});

export const GeneralContexProvider = (props) => {
	const [isFinishStart, setIsFinishStart] = useState(false);
	const [isGeneral, setIsGeneral] = useState(true);
	const [isTitleValid, setIsTitleValid] = useState(false);
	const [isAddFriendsOn, setIsAddFriendOn] = useState(false);
	const [isCleared, setIsCleared] = useState(false);

	useEffect(() => {
		const storagedFinishStartInformation =
			localStorage.getItem('isFinishStart');

		if (storagedFinishStartInformation === '1') {
			setIsFinishStart(true);
		}
	}, []);

	const backToStartHandler = () => {
		localStorage.removeItem('isFinishStart');
		setIsFinishStart(false);
	};

	const finishStartHandler = () => {
		setTimeout(() => {
			localStorage.setItem('isFinishStart', 1);
			setIsFinishStart(true);
		}, 2000);
	};

	// Form Mode change handler

	useEffect(() => {
		const storagedFormMode = localStorage.getItem('formMode');

		if (storagedFormMode === '1') {
			setIsGeneral(false);
		}
	}, []);

	const changeToAdvancedModeHandler = () => {
		setTimeout(() => {
			localStorage.setItem('formMode', 1);
			setIsGeneral(false);
		}, 1000);
	};

	const changeToGeneralModeHandler = () => {
		setTimeout(() => {
			localStorage.removeItem('formMode');
			setIsGeneral(true);
		}, 1000);
	};

	const setTitleIsValidHandler = (value) => {
		setIsTitleValid(value);
	};

	const addFriendsOnHandler = () => {
		setIsAddFriendOn(true);
	};

	const addFriendsOffHandler = () => {
		setIsAddFriendOn(false);
	};

	const onClearButton = () => {
		localStorage.removeItem('formMode');
		setIsGeneral(true);
		setIsCleared(!isCleared);
	};

	return (
		<GeneralContext.Provider
			value={{
				isFinishStart: isFinishStart,
				onBackToStart: backToStartHandler,
				onSkipStart: finishStartHandler,
				isGeneral: isGeneral,
				changeToAdvanced: changeToAdvancedModeHandler,
				changeToGeneral: changeToGeneralModeHandler,
				isTitleValid: isTitleValid,
				onSetTitleValid: setTitleIsValidHandler,
				isAddFriendsOn: isAddFriendsOn,
				onChangeToOn: addFriendsOnHandler,
				onChangeToOff: addFriendsOffHandler,
				isCleared: isCleared,
				onClearButton: onClearButton,
			}}>
			{props.children}
		</GeneralContext.Provider>
	);
};

export default GeneralContext;
