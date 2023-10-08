import { useContext, useEffect, useState } from 'react';
import RadioInput from '../../../UI/RadioInput';

import './Colors&icons.css';
import classes from './TaskCategoryType.module.css';
import UserDataContext from '../../../../Context/userData-context';

const categoryList = [
	{ id: 'dinner' },
	{ id: 'game' },
	{ id: 'sport' },
	{ id: 'outside' },
	{ id: 'shopping' },
];

const findCategoryId = (category) => {
	for (let i = 0; i < categoryList.length; i++) {
		if (categoryList[i].id === category) {
			return categoryList[i].id;
		}
	}
};

const TaskCategoryType = (props) => {
	const userCtx = useContext(UserDataContext);
	const [selectedValue, setSelectedValue] = useState(
		findCategoryId(userCtx.category)
	);

	const [blockEffect, setBlockEffect] = useState(false);

	useEffect(() => {
		if (!blockEffect) {
			userCtx.onAddCategory(selectedValue);
		}
	}, [blockEffect, selectedValue, userCtx]);

	const handleRadioChange = (e) => {
		setSelectedValue(e.target.id);
	};

	useEffect(() => {
		if (userCtx.isCleared) {
			setSelectedValue('dinner');
		}
	}, [userCtx.isCleared]);

	useEffect(() => {
		setSelectedValue(findCategoryId(userCtx.category));
		setBlockEffect(true);
	}, [userCtx.category]);

	return (
		<div
			className={`${props.className}  ${classes['task-type']} ${classes.manyRadioInputs}`}>
			<h3>Typ</h3>
			<div className={`${classes.types} ${classes.radios}`}>
				{categoryList.map((item) => (
					<RadioInput
						key={item.id}
						id={item.id}
						onChange={handleRadioChange}
						checked={selectedValue === item.id}
					/>
				))}
			</div>
		</div>
	);
};

export default TaskCategoryType;
