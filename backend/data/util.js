import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'discountsproject',
});

export const readData = async () => {
	const query = `SELECT id, nickname, password FROM accounts`;
	const [data] = await connection.query(query);
	return JSON.parse(JSON.stringify(data));
};


