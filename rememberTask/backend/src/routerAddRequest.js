import { Router } from 'express';
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'remember_task',
});

const addRequest = Router();

const mysqlDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

addRequest.post('/addRequest', async (req, res) => {
	try {
		const userData = req.body;
		console.log(userData);

		const queryToTask = `
		        INSERT INTO
		        tasks (title, reminder, color, type)
		        VALUES (?, ?, ?, ?)
		    `;

		const [result] = await db.execute(queryToTask, [
			userData.title,
			userData.reminder,
			userData.mainColor,
			userData.type,
		]);

		const task_id = result.insertId;

		const iconToTask = `
		        INSERT INTO
		        icon (task_id, color, type)
		        VALUES (?, ?, ?)
		    `;

		await db.execute(iconToTask, [
			task_id,
			userData.icon.color,
			userData.icon.type,
		]);

		const dateToTask = `
		        INSERT INTO
		        date (task_id, date, from_time, to_time)
		        VALUES (?, ?, ?, ?)
		    `;

		await db.execute(dateToTask, [
			task_id,
			userData.date.date,
			userData.date.from_time,
			userData.date.to_time,
		]);

		const friendsToTask = `
		INSERT INTO
		friends (task_id, name)
		VALUES (?, ?)
		`;

		for (let i = 0; i < userData.friends.length; i++) {
			await db.execute(friendsToTask, [task_id, userData.friends[i].value]);
		}

		const changeLog = `INSERT INTO
		changelog (type, task_id, description, date)
		VALUES (?, ?, ?, ?)`;

		await db.execute(changeLog, [
			'Insert',
			task_id,
			`Inserted new task with id: ${task_id}`,
			mysqlDate,
		]);
	} catch (err) {
		console.error(err);
	}
});

export default addRequest;
