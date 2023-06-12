const currentYear = document.querySelector('.currentYear');
const text = document.querySelector('.header-text');
const mail = document.querySelector('.mail');
const copyAlert = document.querySelector('.copy-alert ') 

const currentYearFunction = () => {
	const data = new Date().getFullYear();
	currentYear.textContent = data;
};

const copyMail = () => {
	const textarea = document.createElement('textarea');
	textarea.value = mail.textContent;
	document.body.append(textarea);

	textarea.select();
	document.execCommand('copy');

    copyAlert.classList.add('copy-alert-animation')

    setTimeout(() => {
        copyAlert.classList.remove('copy-alert-animation')
    }, 1500)

	document.body.removeChild(textarea);
};

const typed = () => {
	const typed = new Typed(text, {
		strings: ['najlepsze ciuchy', 'zaufany sklep'],
		typeSpeed: 150,
		backSpeed: 50,
		loop: true,
	});

	text.textContent = typed;
};

mail.addEventListener('click', copyMail);
window.addEventListener('load', currentYearFunction);
window.addEventListener('load', typed);

