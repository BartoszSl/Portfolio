import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'remember_task',
});

try {
	const insertNewTask = async (task) => {
		try {
			const query = `
                INSERT INTO 
                tasks (title, reminder, color, type)
                VALUES (?, ?, ?, ?)
            `;

			const [result] = await connection.execute(query, [
				task.title,
				task.reminder,
				task.color,
				task.type,
			]);

			return { ...task, id: result.insertId };
		} catch (err) {
			throw err;
		}
	};

	const insertIconToTask = async (icon) => {
		try {
			const query = `
                INSERT INTO 
                icon (task_id, color, type)
                VALUES (?, ?, ?)
            `;

			const [result] = await connection.execute(query, [
				icon.task_id,
				icon.color,
				icon.type,
			]);

			return { ...icon, id: result.insertId };
		} catch (err) {
			throw err;
		}
	};

	const insertDateToTask = async (icon) => {
		try {
			const query = `
                INSERT INTO
                date (task_id, date, from_time, to_time)
                VALUES (?, ?, ?, ?) 
            `;

			const [result] = await connection.execute(query, [
				icon.task_id,
				icon.date,
				icon.from_time,
				icon.type === 1 ? icon.to_time : null,
			]);

			return { ...icon, id: result.insertId };
		} catch (err) {
			throw err;
		}
	};

	const insertFriendToTask = async (friend) => {
		try {
			const query = ` 
                INSERT INTO 
                friends (task_id, name, surname)
                VALUES (?, ?, ?)
            `;

			const insertedFriends = [];

			for (let i = 0; i < friend.many.length; i++) {
				const [result] = await connection.execute(query, [
					friend.task_id,
					friend.many[i].name,
					friend.many[i].surname,
				]);

				insertedFriends.push({ ...friend.many[i], id: result.insertId });
			}

			return insertedFriends;
		} catch (err) {
			throw err;
		}
	};

	const newTask = await insertNewTask({
		title: 'Pierwszy Test',
		reminder: 0,
		color: '#123456',
		type: 'outside',
	});

	await insertFriendToTask({
		task_id: newTask.id,
		many: [
			{
				name: 'Elwis',
				surname: 'Preslej',
			},
			{
				name: 'David',
				surname: 'Testowy',
			},
		],
	});

	await insertIconToTask({
		task_id: newTask.id,
		color: '#152685',
		type: 2,
	});

	await insertDateToTask({
		task_id: newTask.id,
		type: 1,
		date: '2023-09-05',
		from_time: '16:56:48',
		to_time: '16:56:48',
	});
} catch (err) {
	console.error('Wystąpił błąd', err);
} finally {
	await connection.end();
}
