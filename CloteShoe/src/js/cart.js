const cartOpenButton = document.querySelectorAll('.section__cart-btn');
const cartShadow = document.querySelector('.cart-shadow');
const cart = document.querySelector('.cart');

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
		},
		2: {
			name: 'Spodenki',
			prize: 34,
			location: 'Poland',
			type: 'Jeans',
			text: 'Spodenki w stylu Jeans to ostatni krzyk mody, który na pewno Ci się spodoba! W końcu każdy szanowany się człowiek ubierze coś wygodnego, a na ciepłe dni coś lekkiego zamiast phi długich spodni.',
		},
    3: {
			name: 'czapka',
			prize: 13,
			location: 'German',
			type: 'Basic',
			text: '',
		},
    4: {
			name: 'plecak',
			prize: 45,
			location: 'France',
			type: 'Tactical',
			text: '',
		},
	},
};

for (const key in allData.id) {
	if (allData.id.hasOwnProperty(key)) {
		const item = allData.id[key];
		console.log(item.name);
		console.log('$' + item.prize);
		console.log(item.location);
		console.log(item.type);
		console.log(item.text);
		console.log("$" + Math.round(item.prize * 1.1)); // last prize
	}
}

const listenerEvents = () => {
	cartOpenButton.forEach((item) => item.addEventListener('click', handleOpen));
	cartShadow.addEventListener('click', closeCart); // Dodanie nasłuchiwania zdarzenia kliknięcia na cartShadow
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
		// Sprawdzenie, czy kliknięcie nastąpiło na cartShadow
		cart.style.display = 'none';
		cartShadow.style.display = 'none';
	}
};

window.addEventListener('load', listenerEvents);
