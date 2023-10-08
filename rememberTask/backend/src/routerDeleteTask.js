import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'remember_task',
});

export const deleteTaskById = async (req, res) => {
	try {
		const task_id = req.query.id;

		if (!task_id) return;

		await db.query('DELETE FROM date WHERE task_id = ?', [task_id]);
		await db.query('DELETE FROM icon WHERE task_id = ?', [task_id]);
		await db.query('DELETE FROM friends WHERE task_id = ?', [task_id]);
		await db.query('DELETE FROM tasks WHERE id = ?', [task_id]);

		console.log('Done');
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ error: 'Wystąpił błąd serwera przy usuwaniu danych.' });
	}
};

export const deleteTasksByManyId = async (req, res) => {
	console.log('Many ids');
	try {
		const idsToDelete = req.body.ids;

		if (
			!idsToDelete ||
			!Array.isArray(idsToDelete) ||
			idsToDelete.length === 0
		) {
			return res.status(400).json({ error: 'Nieprawidłowe dane wejściowe.' });
		}

		await Promise.all(
			idsToDelete.map(async (id) => {
				await db.query('DELETE FROM date WHERE task_id = ?', [id]);
				await db.query('DELETE FROM icon WHERE task_id = ?', [id]);
				await db.query('DELETE FROM friends WHERE task_id = ?', [id]);
				await db.query('DELETE FROM tasks WHERE id = ?', [id]);
			})
		);

		console.log('Done');
		res.status(200).json({ message: 'Tablice zostały usunięte.' });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ error: 'Wystąpił błąd serwera przy usuwaniu tablic.' });
	}
};