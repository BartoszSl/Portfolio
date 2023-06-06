const currentYear = document.querySelector('.currentYear');
const text = document.querySelector('.header-text');

const currentYearFunction = () => {
	const data = new Date().getFullYear();
	currentYear.textContent = data;
};


const typed = () => {
    const typed = new Typed(text, {
        strings: ['najlepsze ciuchy', 'zaufany sklep'],
        typeSpeed: 150,
        backSpeed: 50,
        loop: true,
    });

    text.textContent = typed
}


window.addEventListener('load', currentYearFunction);
window.addEventListener('load', typed)
