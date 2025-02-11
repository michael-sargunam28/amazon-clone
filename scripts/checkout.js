import { cart ,deleteCart} from "../data/cart.js";
import { products } from "../data/products.js";
import { formattedCurrency } from "./utils/money.js";


let cartBox = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId; // Correct the typo here
  console.log("Product ID:", productId);  // Debug log for productId

  // Find the product by matching productId
  let matchingProduct = products.find((product) => product.id === productId);

  if (!matchingProduct) {
    console.log(`No matching product found for productId: ${productId}`);
    return;  // Skip this cart item if no product is found
  }

  cartBox += `
   <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formattedCurrency(matchingProduct)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link  link-primary" data-product-id = ${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;})
          const orderSummary = document.querySelector('.js-order-summary');
          if (orderSummary) {
            orderSummary.innerHTML = cartBox;
          } else {
            console.error("Element '.js-order-summary' not found in the DOM.");
          }
           

document.querySelectorAll('.delete-quantity-link').forEach((link) =>{
  link.addEventListener('click',() => {
    const {productId} = link.dataset;
    deleteCart(productId);
  })
})