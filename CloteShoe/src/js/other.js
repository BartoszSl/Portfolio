const currentYear = document.querySelector('.currentYear');

const currentYearFunction = () => {
	const data = new Date().getFullYear();
	currentYear.textContent = data;
};

window.addEventListener('load', currentYearFunction);

