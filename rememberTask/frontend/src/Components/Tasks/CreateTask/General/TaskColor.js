import { useCallback, useContext, useEffect, useState } from 'react';
import classes from './TaskColor.module.css';

import './Colors&icons.css';
import RadioInput from '../../../UI/RadioInput';
import UserDataContext from '../../../../Context/userData-context';
import useHttp from '../../../../hooks/use-http';

const rgbToHex = (rgb) => {
	const rgbValues = rgb.slice(4, -1).split(', ').map(Number);

	const hexColor =
		'#' +
		rgbValues
			.map((value) => {
				const hex = value.toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			})
			.join('');

	return hexColor;
};

const TaskColor = (props) => {
	const [colorsList, setColorsList] = useState([]);

	const findSelectedColorId = useCallback(
		(mainColor) => {
			for (let i = 0; i < colorsList.length; i++) {
				if (colorsList[i].color === mainColor) {
					return colorsList[i].id;
				}
			}
		},
		[colorsList]
	);
	const userCtx = useContext(UserDataContext);

	const [color, setColor] = useState(userCtx.mainColor);
	const [selectedValue, setSelectedValue] = useState(
		findSelectedColorId(userCtx.mainColor)
	);
	const [blockEffect, setBlockEffect] = useState(false);

	const { sendRequest: fetchColors } = useHttp();

	const requestToDataBase = useCallback(() => {
		const transformTasks = (tasksObj) => {
			const loadedTasks = [];

			for (const taskKey in tasksObj) {
				loadedTasks.push({
					key: tasksObj[taskKey].id,
					id: tasksObj[taskKey].colorId,
					color: tasksObj[taskKey].colorHex,
				});
			}

			setColorsList(loadedTasks);
		};

		fetchColors(
			{
				url: 'http://localhost:3001/select-colors',
			},
			transformTasks
		);
	}, [fetchColors]);

	useEffect(() => {
		requestToDataBase();
	}, [requestToDataBase]);

	useEffect(() => {
		if (!blockEffect) {
			userCtx.onAddMainColor(color);
		}
	}, [blockEffect, color, selectedValue, userCtx]);

	const handleRadioChange = (e) => {
		const computedStyles = window.getComputedStyle(e.target);
		const cColor = computedStyles.backgroundColor;

		setBlockEffect(false);
		setColor(rgbToHex(cColor));
		setSelectedValue(e.target.id);
	};

	useEffect(() => {
		if (userCtx.isCleared) {
			setSelectedValue('light-blue');
			setColor('#83b8df');
		}
	}, [userCtx.isCleared]);

	useEffect(() => {
		setSelectedValue(findSelectedColorId(userCtx.mainColor));
		setColor(userCtx.mainColor);
		setBlockEffect(true);
	}, [findSelectedColorId, userCtx.mainColor]);

	return (
		<div
			className={`${props.className} ${classes['task-color']} ${classes.manyRadioInputs}`}>
			<h3>Kolor</h3>
			<div className={`${classes.colors} ${classes.radios}`}>
				{colorsList.map((item) => (
					<RadioInput
						key={item.id}
						id={item.id}
						type='radio'
						name='colors'
						onChange={handleRadioChange}
						checked={selectedValue === item.id}
					/>
				))}
			</div>
		</div>
	);
};

export default TaskColor;
