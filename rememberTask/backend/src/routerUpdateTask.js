import { Router } from 'express';
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'remember_task',
});

const updateTask = Router();

const mysqlDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

updateTask.post('/udpate-task', async (req, res) => {
	const [task_id, newData] = req.body;

	console.log(task_id);
	console.log(newData);
	try {
		const removeLastFriends = 'DELETE FROM friends WHERE friends.task_id = ?';
		await db.query(removeLastFriends, [task_id.id]);

		const addNewFriends = `
      INSERT INTO 
      friends (task_id, name, surname)
      VALUES (?, ?, ?)
    `;

		const insertedFriends = [];

		for (let i = 0; i < newData.friends.length; i++) {
			const [result] = await db.execute(addNewFriends, [
				task_id,
				newData.friends[i].name,
			]);

			insertedFriends.push({ ...newData.friends[i], id: result.insertId });
		}

		const query = `
      UPDATE tasks
      INNER JOIN icon ON tasks.id = icon.task_id
      INNER JOIN date ON tasks.id = date.task_id
      SET tasks.title = ?,
          tasks.type = ?,
          tasks.color = ?,
          tasks.reminder = ?,
          date.date = ?,
          date.from_time = ?,
          date.to_time = ?,
          icon.type = ?,
          icon.color = ?
      WHERE tasks.id = ?;
    `;

		await db.query(query, [
			newData.title,
			newData.type,
			newData.mainColor,
			newData.reminder,
			newData.date.date,
			newData.date.from_time,
			newData.reminder === 1 ? newData.date.to_time : null,
			newData.icon.type,
			newData.icon.color,
			task_id,
		]);

		const changeLog = `INSERT INTO
		changelog (type, task_id, description, date)
		VALUES (?, ?, ?, ?)`;

		await db.execute(changeLog, [
			'Update',
			task_id,
			`Updated task with id: ${task_id}`,
			mysqlDate,
		]);

		return newData;
	} catch (err) {
		console.error(err);
	}
});

export default updateTask;
