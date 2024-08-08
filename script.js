localStorage.removeItem('cartItems');

const cartItems = [];
const productList = document.getElementById('product-list');
const cart = document.getElementById('cart');
const checkoutButton = document.getElementById('checkout');
const totalBanner = document.getElementById('total-banner');

let products = [];

updateCartHTML();

updateTotalCost();

Array.from(productList.children).forEach((product) => {
  product.querySelector('button').addEventListener('click', () => {
    const productName = product.querySelector('span').textContent;
    const productPrice = 25.99;
    const productImage = product.querySelector('img').src;

    addProductToCart(productName, productPrice, productImage);
  });
});

cart.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const cartItem = event.target.parentNode;
    const productName = cartItem.querySelector('span').textContent;
    const productPrice = parseFloat(cartItem.querySelector('span:nth-child(3)').textContent.replace('$', ''));

    removeProductFromCart(productName, productPrice);
  }
});

checkoutButton.addEventListener('click', () => {
  alert(`Total cost: ${totalBanner.textContent}`);
});

function addProductToCart(productName, productPrice, productImage) {
  const existingCartItem = cartItems.find((cartItem) => cartItem.name === productName);
  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cartItems.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
  }

  updateCartHTML();
  updateTotalCost();
}

function removeProductFromCart(productName, productPrice) {
  const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.name === productName);
  if (cartItemIndex !== -1) {
    cartItems.splice(cartItemIndex, 1);
  }
  updateCartHTML();
  updateTotalCost();
}
function updateCartHTML() {
  cart.innerHTML = '';
  cartItems.forEach((cartItem) => {
    const cartItemHTML = `
      <div class="cart-item">
        <img src="${cartItem.image}" alt="${cartItem.name}">
        <span>${cartItem.name}</span>
        <span>$${cartItem.price}</span>
        <button>Remove</button>
      </div>
    `;
    cart.innerHTML += cartItemHTML;
  });
}

function updateTotalCost() {
  let totalCost = 0;
  cartItems.forEach((cartItem) => {
    totalCost += cartItem.price * cartItem.quantity;
  });
  totalBanner.textContent = `$${totalCost.toFixed(2)}`;
}