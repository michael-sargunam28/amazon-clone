export const cart = [];

//clearing Timeout
const addedCartTimeout = {};

export function addToCart(productId) {
  let matching;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matching = item;
    }
  });

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);

  if (matching) {
    matching.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  }

  // Store cart in local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log(cart);
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function timeoutForAddedCart(productId) {
  const previousTimeoutId = addedCartTimeout[productId];
  const addedCart = document.querySelector(`.js-added-cart-${productId}`);
  addedCart.classList.add("added-to-cart-clicked");
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeout = setTimeout(() => {
    addedCart.classList.remove("added-to-cart-clicked");
  }, 2000);

  addedCartTimeout[productId] = timeout;
}

// Load cart from localStorage on page load
export function loadCartFromStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart.push(...JSON.parse(storedCart));
  }
}
