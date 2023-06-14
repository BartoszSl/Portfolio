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
const textInBottom = document.querySelector('.down-text');
const addToBuy = document.querySelector('.addToBuy');
const buy = document.querySelector('.buy');
const addNewItem = document.querySelector('.addNewItem');
const itemSlot = document.querySelector('.item-slot');
const bestBtn = document.querySelector('.best-btn');
const errorAlert = document.querySelector('.errorAlert');

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
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ipsa quos nemo impedit ea sint iste consequuntur non veritatis delectus.',
			img: '/dist/img/czapkaZDaszkiem.jpg',
			alt: 'Czapka',
		},
		4: {
			name: 'Plecak',
			prize: 45,
			location: 'France',
			type: 'Tactical',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In veritatis minus, expedita nostrum blanditiis mollitia corporis recusandae sequi commodi laudantium neque! Aspernatur, pariatur nobis! Reprehenderit impedit eveniet aperiam ab rem.',
			img: '/dist/img/plecak.jpg',
			alt: 'Plecak',
		},
	},
};

let page = 0;
let items = -1;

const listenerEvents = () => {
	if (page == 0) {
		console.log('test');
		cartOpenButton.forEach((item) =>
			item.addEventListener('click', handleOpen)
		);
		cartShadow.addEventListener('click', closeCart);
		nextBtn.addEventListener('click', addID);
		backBtn.addEventListener('click', subtractID);
		addToBuy.addEventListener('click', () => {
			cartDataSend();
			items++;
		});
		buy.addEventListener('click', () => {
			cartDataSend();
			buyFunction();
			items++;
		});
		bestBtn.addEventListener('click', handleBestData);
	}
};

let itemAmount = 0;

const addItem = () => {
	itemAmount++;
	itemSlot.textContent = itemAmount;
	if (itemAmount == 0) {
		addNewItem.classList.remove('addNewItemAnimation');
	}
	if (itemAmount >= 10) {
		itemSlot.textContent = '9+';
	}
	addToBuy.classList.add('addToBuyAnimation');
	setTimeout(() => {
		addToBuy.classList.remove('addToBuyAnimation');
		addNewItem.classList.add('addNewItemAnimation');
	}, 700);
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

const itemData = {
	items: [],
	size: [],
	color: [],
	quantity: [],
	name: [],
	type: [],
	prize: []
};

// Przesyłanie danych na transaction

const buyFunction = () => {
	const selectedSize = document.querySelector('input[name=size]:checked');
	const selectedColor = document.querySelector('input[name=color]:checked');
	const selectedQuantity = document.querySelector(
		'input[name=quantity]:checked'
	);
	if (selectedSize && selectedColor && selectedQuantity) {
		window.location.href = '/transaction.html';
	}
};

const cartDataSend = () => {
	const selectedSize = document.querySelector('input[name=size]:checked');
	const selectedColor = document.querySelector('input[name=color]:checked');
	const selectedQuantity = document.querySelector(
		'input[name=quantity]:checked'
	);

	addToBuy.addEventListener('click', (e) => e.preventDefault());

	if (selectedSize && selectedColor && selectedQuantity) {
		itemData['items'].push(items);

		itemData['size'].push(selectedSize.value);
		itemData['color'].push(selectedColor.value);
		itemData['quantity'].push(selectedQuantity.value);
		itemData['name'].push(allData.id[idCart].name);
		itemData['type'].push(allData.id[idCart].type);
		itemData['prize'].push(allData.id[idCart].prize)

		localStorage.setItem('myData', JSON.stringify(itemData));
		addItem();
	} else {
		errorAlert.classList.add('errorAlertAnimation');
		setTimeout(() => {
			errorAlert.classList.remove('errorAlertAnimation');
		}, 2000);
	}
};

const handleData = () => {
	// Cart
	img.setAttribute('src', allData.id[idCart].img);
	img.setAttribute('alt', allData.id[idCart].alt);
	cartTitle.textContent = allData.id[idCart].name;
	type.textContent = allData.id[idCart].type;
	prize.textContent = '$' + allData.id[idCart].prize;
	lastPrize.textContent = '$' + Math.round(allData.id[idCart].prize * 1.1);
	cartText.textContent = allData.id[idCart].text;

	// All section
	allImg.setAttribute('src', allData.id[idCart].img);
	allImg.setAttribute('alt', allData.id[idCart].alt);
	contentTitle.textContent = allData.id[idCart].name;
	allPrize.textContent = '$' + allData.id[idCart].prize;
	allLocation.textContent = allData.id[idCart].location;
	textInBottom.textContent = allData.id[idCart].name;
};

const handleBestData = () => {
	idCart = 3;

	// Cart
	img.setAttribute('src', allData.id[idCart].img);
	img.setAttribute('alt', allData.id[idCart].alt);
	cartTitle.textContent = allData.id[idCart].name;
	type.textContent = allData.id[idCart].type;
	prize.textContent = '$' + allData.id[idCart].prize;
	lastPrize.textContent = '$' + Math.round(allData.id[idCart].prize * 1.1);
	cartText.textContent = allData.id[idCart].text;
};

let isBlocked = false;
let clickCount = 0;

const handleOpen = () => {
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

window.addEventListener('DOMContentLoaded', () => {
	if (page == 0) {
		listenerEvents();
		handleData();
	}
});
