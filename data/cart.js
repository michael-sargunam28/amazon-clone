export let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
      deliveryOptionsId :'2'
    });
  }

  // Store cart in local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  
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


export function deleteCart(productId) {
  let newCart = [];
    cart.forEach((products) => {
      if (products.productId !== productId) {
        newCart.push(products);
      }

    });
    cart = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));

    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    document.addEventListener("DOMContentLoaded",() =>{
      updateCartQuantity();});
    

}

export function updateDeliveryOption(productId,deliveryOptionsId) {
  let matching;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matching = item;
    }
  });

  matching.deliveryOptionsId = deliveryOptionsId;
  localStorage.setItem('cart', JSON.stringify(cart));


}