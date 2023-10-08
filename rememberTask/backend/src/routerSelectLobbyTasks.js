import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'remember_task',
});

export const selectLobbyRequest = async (req, res) => {
	try {
		const query = `SELECT tasks.id, tasks.title, tasks.color, tasks.type, date.date, icon.color AS 'iconColor', icon.type AS 'iconType' 
                   FROM tasks 
                   INNER JOIN date ON tasks.id = date.task_id 
                   INNER JOIN icon ON tasks.id = icon.task_id
                  `;

		const [results] = await db.query(query);
		res.json(results);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ error: 'Wystąpił błąd serwera przy pobieraniu danych.' });
	}
};

export const selectAllTask = async (req, res) => {
	try {
		const task_id = req.query.id;

		const query = `SELECT tasks.id, tasks.title, tasks.color, tasks.reminder, tasks.type, date.date, friends.name, date.from_time, icon.color AS 'iconColor', icon.type AS 'iconType' 
		FROM tasks 
		INNER JOIN date ON tasks.id = date.task_id 
		INNER JOIN icon ON tasks.id = icon.task_id 
		LEFT JOIN friends ON tasks.id = friends.task_id		 
		WHERE tasks.id = ?
		`;

		const [results] = await db.query(query, [task_id]);
		res.json(results);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ error: 'Wystąpił błąd serwera przy pobieraniu danych.' });
	}
};

export const selectTaskToEdit = async (req, res) => {
	try {
		const task_id = req.query.id;

		const query = `SELECT tasks.id, tasks.title, tasks.color, tasks.reminder, tasks.type, date.date, date.from_time, date.to_time, friends.id AS 'friends_id', friends.name,  icon.color AS 'iconColor', icon.type AS 'iconType' 
		FROM tasks 
		INNER JOIN date ON tasks.id = date.task_id 
		INNER JOIN icon ON tasks.id = icon.task_id 
		LEFT JOIN friends ON tasks.id = friends.task_id		 
		WHERE tasks.id = ?
		`;

		const [results] = await db.query(query, [task_id]);
		console.log(results);
		res.json(results);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ error: 'Wystąpił błąd serwera przy pobieraniu danych.' });
	}
};
