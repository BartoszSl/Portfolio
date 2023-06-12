const nav = document.querySelector('.menu-item');
const navBtn = document.querySelector('.burger-btn');
const allNavItems = document.querySelectorAll('.nav__item');
const navBtnBars = document.querySelector('.burger-btn__bars');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const navLine = document.querySelector('nav');
// const allNavItems = document.querySelectorAll('.nav__item')

const handleNav = () => {
	nav.classList.toggle('menu-item--active');

	navBtnBars.classList.remove('black-bars-color');

	allNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			nav.classList.remove('menu-item--active');
		});
	});
};

const addShadow = () => {
	if (window.scrollY >= 300) {
		navLine.classList.add('shadow-bg');
	} else {
		navLine.classList.remove('shadow-bg');
	}
};


window.addEventListener('scroll', addShadow);

// const handleObserver = () => {
// 	const currentSection = window.scrollY;

// 	allSections.forEach((section) => {
// 		if (
// 			section.classList.contains('white-section') &&
// 			section.offsetTop <= currentSection + 60
// 		) {
// 			navBtnBars.classList.add('black-bars-color');
// 		} else if (
// !section.classList.contains('white-section') &&
// 			section.offsetTop <= currentSection + 60
// 		) {
// 			navBtnBars.classList.remove('black-bars-color');
// 		}
// 	});
// };

navBtn.addEventListener('click', handleNav);
// window.addEventListener('scroll', handleObserver);
