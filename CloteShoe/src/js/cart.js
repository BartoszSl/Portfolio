const cartOpenButton = document.querySelectorAll('.section__cart-btn');
const cartShadow = document.querySelector('.cart-shadow');
const cart = document.querySelector('.cart');

let isBlocked = false;
let clickCount = 0;

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
  if (e === undefined || e.target === cartShadow) { // Sprawdzenie, czy kliknięcie nastąpiło na cartShadow
    cart.style.display = 'none';
    cartShadow.style.display = 'none';
  }
};

window.addEventListener('load', listenerEvents);
