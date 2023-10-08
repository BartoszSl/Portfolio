import { useContext, useEffect, useState } from 'react';
import classes from './TaskColor.module.css';

import './Colors&icons.css';
import RadioInput from '../../../UI/RadioInput';
import UserDataContext from '../../../../Context/userData-context';

const colorsList = [
	{ id: 'light-blue', color: '#83b8df' },
	{ id: 'orange', color: '#ff8c00' },
	{ id: 'pink', color: '#ff5964' },
	{ id: 'green', color: '#59b90e' },
	{ id: 'cyan', color: '#14aeae' },
	{ id: 'magenta', color: '#ac7dd2' },
	{ id: 'violet', color: '#6562fc' },
];

function rgbToHex(rgb) {
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
}

const findSelectedColorId = (mainColor) => {
	for (let i = 0; i < colorsList.length; i++) {
		if (colorsList[i].color === mainColor) {
			return colorsList[i].id;
		}
	}
};

const TaskColor = (props) => {
	const userCtx = useContext(UserDataContext);

	const [color, setColor] = useState(userCtx.mainColor);
	const [selectedValue, setSelectedValue] = useState(
		findSelectedColorId(userCtx.mainColor)
	);
	const [blockEffect, setBlockEffect] = useState(false);

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
	}, [userCtx.mainColor]);

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
