const cartOpenButton = document.querySelectorAll('.section__cart-btn');
const cartShadow = document.querySelector('.cart-shadow');
const cart = document.querySelector('.cart');
const img = document.querySelector('.cartImg');
const cartTitle = document.querySelector('.name');
const type = document.querySelector('.type');
const prize = document.querySelector('.currentPrize');
const lastPrize = document.querySelector('.lastPrize');
const cartText = document.querySelector('.cartText');
const backBtn = document.querySelector('.back-btn');
const nextBtn = document.querySelector('.next-btn');
const allImg = document.querySelector('.allImg');
const contentTitle = document.querySelector('.content-title');
const allPrize = document.querySelector('.all-prize');
const allLocation = document.querySelector('.all-location');
const textInBottom = document.querySelector('.down-text')

let isBlocked = false;
let clickCount = 0;

const allData = {
	id: {
		1: {
			name: 'Koszulka',
			prize: 29,
			location: 'Poland',
			type: 'Basic',
			text: 'Nasz T-Shirt w stylu Basic to idealny wybór dla tych, którzy nie mają pomysły na przyszłą koszulkę. Jest bardzo przyjemna w dotyku i miła dla oka. W upalne jak i chłodne dni to idealny wybór jako jedyne ubranie lub będące pod bluzą.',
			img: '/dist/img/t-shirt.jpg',
			alt: 'Koszulka',
		},
		2: {
			name: 'Spodenki',
			prize: 34,
			location: 'Poland',
			type: 'Jeans',
			text: 'Spodenki w stylu Jeans to ostatni krzyk mody, który na pewno Ci się spodoba! W końcu każdy szanowany się człowiek ubierze coś wygodnego, a na ciepłe dni coś lekkiego zamiast phi długich spodni.',
			img: '/dist/img/spodenki.jpg',
			alt: 'Spodenki',
		},
		3: {
			name: 'Czapka',
			prize: 13,
			location: 'German',
			type: 'Basic',
			text: '',
			img: '/dist/img/czapkaZDaszkiem.jpg',
			alt: 'Czapka',
		},
		4: {
			name: 'Plecak',
			prize: 45,
			location: 'France',
			type: 'Tactical',
			text: '',
			img: '/dist/img/plecak.jpg',
			alt: 'Plecak',
		},
	},
};

// for (const key in allData.id) {
// 	if (allData.id.hasOwnProperty(key)) {
// 		const item = allData.id[key];
// 		console.log(item.name);
// 		console.log('$' + item.prize);
// 		console.log(item.location);
// 		console.log(item.type);
// 		console.log(item.text);
// 		console.log("$" + Math.round(item.prize * 1.1)); // last prize
// 	}
// }

const listenerEvents = () => {
	cartOpenButton.forEach((item) => item.addEventListener('click', handleOpen));
	cartShadow.addEventListener('click', closeCart);
	nextBtn.addEventListener('click', addID);
	backBtn.addEventListener('click', subtractID);
};

let idCart = 1;

const addID = () => {
	if (idCart == 4) {
		idCart = 1;
	} else {
		idCart += 1;
	}
	handleData();
};

const subtractID = () => {
	if (idCart == 1) {
		idCart = 4;
	} else {
		idCart -= 1;
	}
	handleData();
};

const handleData = () => {
	img.setAttribute('src', allData.id[idCart].img);
	img.setAttribute('alt', allData.id[idCart].alt);
	cartTitle.textContent = allData.id[idCart].name;
	type.textContent = allData.id[idCart].type;
	prize.textContent = '$' + allData.id[idCart].prize;
	lastPrize.textContent = '$' + Math.round(allData.id[idCart].prize * 1.1);
	cartText.textContent = allData.id[idCart].text;

	allImg.setAttribute('src', allData.id[idCart].img);
	allImg.setAttribute('alt', allData.id[idCart].alt);
	contentTitle.textContent = allData.id[idCart].name;
	allPrize.textContent = '$' + allData.id[idCart].prize;
	allLocation.textContent = allData.id[idCart].location;
	textInBottom.textContent = allData.id[idCart].name
};


const handleOpen = (e) => {
	cart.style.display = 'flex';
	cartShadow.style.display = 'flex';

	if (!isBlocked) {
		isBlocked = true;
		clickCount++;

		setTimeout(() => {
			if (clickCount === 2) {
				closeCart();
			}
			clickCount = 0;
			isBlocked = false;
		}, 300);
	}
};

const closeCart = (e) => {
	if (e === undefined || e.target === cartShadow) {
		cart.style.display = 'none';
		cartShadow.style.display = 'none';
	}
};

window.addEventListener('load', listenerEvents);
window.addEventListener('load', handleData);
