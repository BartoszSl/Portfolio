import { Fragment, useContext, useEffect, useState } from 'react';

import classes from './CreateTask.module.css';
import GeneralMode from './General/GeneralMode';
import FormControllers from './FormControllers';
import GeneralContext from '../../../Context/general-context';
import TaskTitle from './TaskTitle';
import AdvancedMode from './Advanced/AdvancedMode';
import AddFriends from './Advanced/AddFriends';

const CreateTask = () => {
	const modeCtx = useContext(GeneralContext);
	const [isChangedMode, setIsChangedMode] = useState(false);
	const [addClass, setAddClass] = useState(false);

	const changedMode = (value) => {
		setIsChangedMode(value);
	};

	useEffect(() => {
		setIsChangedMode(false);
	}, [modeCtx.isCleared]);

	useEffect(() => {
		if (isChangedMode) {
			const identifier = setTimeout(() => {
				setAddClass(true);
			}, 1500);
			return () => {
				clearTimeout(identifier);
			};
		} else {
			const identifier = setTimeout(() => {
				setAddClass(false);
			}, 1500);
			return () => {
				clearTimeout(identifier);
			};
		}
	}, [isChangedMode]);

	return (
		<Fragment>
			<div
				className={`${classes.container} ${
					addClass ? classes['container-advanced'] : ''
				}`}>
				<TaskTitle />
				{modeCtx.isGeneral && <GeneralMode isChangedMode={isChangedMode} />}
				{!modeCtx.isGeneral && <AdvancedMode isChangedMode={isChangedMode} />}
			</div>
			<FormControllers onChangedMode={changedMode} />
			{modeCtx.isAddFriendsOn && <AddFriends />}
		</Fragment>
	);
};

export default CreateTask;
