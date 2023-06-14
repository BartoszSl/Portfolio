const product = document.querySelector('.item-product');
const amount = document.querySelector('.item-amount');
const color = document.querySelector('.js-color');
const size = document.querySelector('.js-size');
const itemPrize = document.querySelector('.item-prize');

const tax = document.querySelector('.tax-prize');
const procent = document.querySelector('.js-procent');
const rabat = document.querySelector('.rabat-prize');

const finallyPrize = document.querySelector('.js-finallyPrize');
page = 1;

const storedData = localStorage.getItem('myData');
const parsedData = JSON.parse(storedData);

const addProduct = () => {
	const main = document.querySelector('.main');

	for (let i = 0; i < parsedData.items.length; i++) {
		// section
		const itemsSection = document.createElement('div');
		itemsSection.classList.add('items');

		// Inner section - left

		const itemProduct = document.createElement('p');
		itemProduct.classList.add('black', 'item-product');
		itemProduct.textContent = parsedData.name[i];

		const itemAmount = document.createElement('p');
		itemAmount.classList.add('grey', 'item-amount');
		itemAmount.textContent =
			parsedData.quantity[i] + ' szt * $' + parsedData.prize[i];

		const itemColor = document.createElement('p');
		itemColor.classList.add('grey', 'item-color');
		itemColor.textContent = 'Kolor: ' + parsedData.color[i];

		const itemSize = document.createElement('p');
		itemSize.classList.add('grey', 'item-size');
		itemSize.textContent = 'Rozmiar: ' + parsedData.size[i];

		// Inner section - right

		const itemPrize = document.createElement('p');
		itemPrize.classList.add('item-prize', 'bold', 'black');
		itemPrize.textContent = '$' + parsedData.prize[i] * parsedData.quantity[i];

		// Tworzenie sekcji

		const leftSection = document.createElement('div');
		leftSection.classList.add('left');

		const rightSection = document.createElement('div');
		rightSection.classList.add('right');

		// Dodawanie do html

		leftSection.append(itemProduct);
		leftSection.append(itemAmount);
		leftSection.append(itemColor);
		leftSection.append(itemSize);
		itemsSection.append(leftSection);

		rightSection.append(itemPrize);
		itemsSection.append(rightSection);
		main.prepend(itemsSection);
	}
};
let sum = 0;
let rabatSum = 0;
let taxPrize = 0;
let dzialanie = 0;

for (let i = 0; i < parsedData.prize.length; i++) {
    sum += parsedData.prize[i] * parsedData.quantity[i];
}

const prize = () => {
	const tax = document.querySelector('.tax-prize');
	taxPrize = parsedData.quantity.length * 3;
	tax.textContent = '$' + taxPrize;


	// Baza kodów

	const codeButton = document.querySelector('.code-button');
	const rabat = document.querySelector('.rabat');
	const rabatPrize = document.querySelector('.rabat-prize');
    const finallyPrize = document.querySelector('.js-finallyPrize');

	rabat.style.display = 'none';
	rabatPrize.style.display = 'none';

	const codeFunction = () => {
		const codes = {
			text: ['CloteShoe20', 'BartekFront', 'BestProduct'],
			value: [20, 30, 10],
		};

		const codeInput = document.querySelector('.code').value;

		let find = false;
		let codeAmount = 0;

		for (let i = 0; i < codes.text.length; i++) {
			if (codes.text[i] === codeInput) {
				find = true;
				codeAmount = codes.value[i];
				break;
			}
		}

		const rabatProcent = document.querySelector('.js-procent');
		rabatProcent.textContent = codeAmount;

		if (find == false) {
			rabat.style.display = 'none';
			rabatPrize.style.display = 'none';
		} else {
			rabat.style.display = 'block';
			rabatPrize.style.display = 'block';

			rabatSum = Math.round((codeAmount / 100) * sum);

			rabatPrize.textContent = '$' + rabatSum;
		}

		dzialanie = sum + taxPrize - rabatSum;

		finallyPrize.textContent = '$' + dzialanie;
	};

	// All Prize

	dzialanie = sum + taxPrize - rabatSum;

	finallyPrize.textContent = '$' + dzialanie;

	codeButton.addEventListener('click', codeFunction);
};

addProduct();
prize();
