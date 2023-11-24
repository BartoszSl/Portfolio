export const isValidText = (value, minLength = 1) => {
	return value && value.trim().length >= minLength;
};
