import { useContext, useEffect, useState } from 'react';
import classes from './FormControllers.module.css';
import GeneralContext from '../../../Context/general-context';
import UserDataContext from '../../../Context/userData-context';

const FormControllers = (props) => {
	const generalCtx = useContext(GeneralContext);
	const userCtx = useContext(UserDataContext);
	const [isValid, setIsValid] = useState(false);
	const [isAllValid, setIsAllValid] = useState(false);

	const toggleMode = (isGeneralMode) => {
		if (isValid) {
			props.onChangedMode(isGeneralMode);
			!isGeneralMode
				? generalCtx.changeToGeneral()
				: generalCtx.changeToAdvanced();
		}
	};

	useEffect(() => {
		setIsValid(userCtx.isTitleValid);
		setIsAllValid(userCtx.isAllCorrect);
	}, [userCtx]);

	const clearButtonHandler = () => {
		userCtx.onClearHandler();
		generalCtx.onClearButton();
	};

	return (
		<div className={classes['options']}>
			{generalCtx.isGeneral ? (
				<p
					className={`${classes['toggle-mode']} ${
						!isValid ? classes.invalid : ''
					}`}
					onClick={() => toggleMode(true)}>
					Zaawansowane
				</p>
			) : (
				<p
					className={`${classes['toggle-mode']} ${
						!isValid ? classes.invalid : ''
					}`}
					onClick={() => toggleMode(false)}>
					Podstawowe
				</p>
			)}
			<div className={classes.buttons}>
				<button
					type='button'
					className={classes.clear}
					onClick={clearButtonHandler}>
					Wyczyść
				</button>
				<button
					type='submit'
					className={!isAllValid ? classes['submit-invalid'] : ''}
					style={{ backgroundColor: userCtx.mainColor }}>
					Stwórz
				</button>
			</div>
		</div>
	);
};

export default FormControllers;
