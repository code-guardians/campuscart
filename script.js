// ====== MENU, SEARCH, USER, CART TOGGLE ======
let search = document.querySelector('.search-box');
let cart = document.querySelector('.cart');
let user = document.querySelector('.user');
let navbar = document.querySelector('.navbar');

document.querySelector('#search-icon').onclick = () => {
  search.classList.toggle('active');
  cart.classList.remove('active');
  user.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#cart-icon').onclick = () => {
  cart.classList.toggle('active');
  search.classList.remove('active');
  user.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#user-icon').onclick = () => {
  user.classList.toggle('active');
  search.classList.remove('active');
  cart.classList.remove('active');
  navbar.classList.remove('active');
};

document.querySelector('#menu-icon').onclick = () => {
  navbar.classList.toggle('active');
  search.classList.remove('active');
  cart.classList.remove('active');
  user.classList.remove('active');
};

window.onscroll = () => {
  search.classList.remove('active');
  cart.classList.remove('active');
  user.classList.remove('active');
  navbar.classList.remove('active');
};

let header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});

// ====== ADD TO CART FUNCTIONALITY ======
let cartItems = [];
const cartContainer = document.querySelector('.cart');
const productButtons = document.querySelectorAll('.bx-cart');

// Listen for click on each "cart" icon
productButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const productBox = e.target.closest('.product-box, .notebook, .assignment-book, .record-sheets, .record-pads, .chips, .Pringles, .Dairy, .5star, .Kurkure, .Ice'); // covers all pages
    if (!productBox) return;

    const name = productBox.querySelector('h2').textContent;
    const price = productBox.querySelector('span').textContent;
    const imgSrc = productBox.querySelector('img').src;

    addToCart(name, price, imgSrc);
  });
});

function addToCart(name, price, imgSrc) {
  const existingItem = cartItems.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name, price, imgSrc, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const cartBoxes = cartContainer.querySelectorAll('.box');
  cartBoxes.forEach((box) => box.remove()); // clear old cart

  let total = 0;

  cartItems.forEach((item) => {
    const priceValue = parseInt(item.price.replace(/\D/g, ''));
    total += priceValue * item.quantity;

    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}">
      <div class="text">
        <h3>${item.name}</h3>
        <span>${item.price}</span>
        <span>x${item.quantity}</span>
      </div>
      <i class='bx bx-trash'></i>
    `;
    cartContainer.insertBefore(box, cartContainer.querySelector('h2'));
    
    // delete item
    box.querySelector('.bx-trash').addEventListener('click', () => {
      removeItem(item.name);
    });
  });

  cartContainer.querySelector('h2').textContent = `Total: Rs. ${total}/-`;
}

function removeItem(name) {
  cartItems = cartItems.filter((item) => item.name !== name);
  renderCart();
}
