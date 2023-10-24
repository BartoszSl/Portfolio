import { useCallback, useContext, useEffect, useState } from 'react';
import RadioInput from '../../../UI/RadioInput';

import './Colors&icons.css';
import classes from './TaskCategoryType.module.css';
import UserDataContext from '../../../../Context/userData-context';
import useHttp from '../../../../hooks/use-http';

let canSend = false;

const TaskCategoryType = (props) => {
	const [categoryList, setCategoryList] = useState([]);

	const userCtx = useContext(UserDataContext);
	const [selectedValue, setSelectedValue] = useState(userCtx.category);

	const { sendRequest: fetchCategories } = useHttp();

	const requestToDataBase = useCallback(() => {
		const transformTasks = (tasksObj) => {
			const loadedCategories = [];

			for (const taskKey in tasksObj) {
				loadedCategories.push({
					key: tasksObj[taskKey].id,
					id: tasksObj[taskKey].categoryId,
				});
			}

			setCategoryList(loadedCategories);
		};

		fetchCategories(
			{
				url: 'http://localhost:3001/select-categories',
			},
			transformTasks
		);
	}, [fetchCategories]);

	useEffect(() => {
		requestToDataBase();
	}, [requestToDataBase]);

	useEffect(() => {
		if (!canSend) {
			canSend = true;
			return;
		}

		userCtx.onAddCategory(selectedValue);
	}, [selectedValue, userCtx]);

	const handleRadioChange = (e) => {
		setSelectedValue(e.target.id);
	};

	useEffect(() => {
		if (userCtx.isCleared) {
			setSelectedValue('dinner');
		}
	}, [userCtx.isCleared]);

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
