import axios from 'axios';
import { useEffect, useState } from 'react';

import classes from './AllTask.module.css';

const AllTask = (props) => {
	const [dataBaseData, setDateBaseData] = useState([]);

	const requestToDateBase = () => {
		axios
			.get(`http://localhost:3001/select-task?id=${props.task_id}`)
			.then((response) => {
				setDateBaseData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		setDateBaseData([]);
		console.log(props.task_id);
		try {
			requestToDateBase();
			console.log(dataBaseData);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const convertSvgIcon = (category) => {
		if (category === 'dinner') return 'fa-solid fa-utensils';
		if (category === 'game') return 'fa-solid fa-headset';
		if (category === 'sport') return 'fa-solid fa-volleyball';
		if (category === 'outside') return 'fa-solid fa-sun';
		if (category === 'shopping') return 'fa-solid fa-bag-shopping';
	};

	const convertReminder = (type) => {
		if (type === 0) return 'Wydarzenie';
		if (type === 1) return 'Przypomnienie';
	};

	const convertDate = (date) => {
		const data = new Date(date);
		const rok = data.getFullYear();
		const miesiac = String(data.getMonth() + 1).padStart(2, '0');
		const dzien = String(data.getDate()).padStart(2, '0');

		const betterDate = `${dzien}-${miesiac}-${rok}r.`;
		return betterDate;
	};

	return dataBaseData.length > 0 ? (
		<div className={classes['task-container']}>
			<h3 className={classes.title}>
				{dataBaseData[0].title}
				<i className={convertSvgIcon(dataBaseData[0].type)}></i>
			</h3>
			<p>
				<span className={classes['static-text']}>Kolor: </span>
				<span style={{ color: dataBaseData[0].color }}>
					{dataBaseData[0].color}
				</span>
			</p>
			<p>
				<span className={classes['static-text']}>Typ Zadania: </span>
				{convertReminder(dataBaseData[0].reminder)}
			</p>
			<p>
				<span className={classes['static-text']}>Kategoria: </span>
				{dataBaseData[0].type}
			</p>
			<p>
				<span className={classes['static-text']}>Data: </span>
				{convertDate(dataBaseData[0].date)}
			</p>
			<p>
				<span className={classes['static-text']}>Czas: </span>
				{dataBaseData[0].from_time}
			</p>
			{dataBaseData[0].name !== null && (
				<p>
					<span className={classes['static-text']}>Przyjaciele: </span>
					{dataBaseData[0].name}
				</p>
			)}
			<p>
				<span className={classes['static-text']}>Ikona: </span>
				{dataBaseData[0].iconType}\
				<span style={{ color: dataBaseData[0].iconColor }}>
					{dataBaseData[0].iconColor}
				</span>
			</p>
		</div>
	) : (
		''
	);
};

export default AllTask;
