const getString = value => (value || '').toString();

const isNumber = value => !isNaN(parseFloat(value)) && isFinite(value);

const getNumberIfValid = value => (isNumber(value) ? parseFloat(value) : null);

const getNumberIfPositive = value => {
	const n = getNumberIfValid(value);
	return n && n >= 0 ? n : null;
};

export default {
    getString,
    isNumber,
	getNumberIfValid,
	getNumberIfPositive,
};
