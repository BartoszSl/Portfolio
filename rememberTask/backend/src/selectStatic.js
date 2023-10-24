import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'remember_task',
});

export const selectColors = async (req, res) => {
	try {
		const query = `SELECT * FROM colors`;

		const [results] = await db.query(query);
		res.json(results);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ error: 'Wystąpił błąd serwera przy pobieraniu danych.' });
	}
};

export const selectCategories = async (req, res) => {
	try {
		const query = `SELECT * FROM categories`;

		const [results] = await db.query(query);
		res.json(results);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ error: 'Wystąpił błąd serwera przy pobieraniu danych.' });
	}
};