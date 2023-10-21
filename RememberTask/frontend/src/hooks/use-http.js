import { useCallback } from 'react';

const useHttp = () => {
	const sendRequest = useCallback(async (requestConfig, applyData) => {
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			if (applyData) {
				const data = await response.json();
				applyData(data);
			}
		} catch (err) {
			throw err;
		}
	}, []);

	return { sendRequest };
};

export default useHttp;
