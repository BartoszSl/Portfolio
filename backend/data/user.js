import { readData } from './util.js';

export const get = async (nickname) => {
	const storedData = await readData();

	console.log('Stored Data: ', storedData);
	console.log(nickname);

	if (!storedData || storedData.length === 0) {
		throw new Error('Error');
	}

	const user = storedData.find((ev) => ev.nickname === nickname);
	if (!user) {
		throw new Error('Error');
	}

	return user;
};
