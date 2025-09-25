import { cart} from "../../data/cart-class.js";
import { products } from "../../data/products.js";
import { formattedCurrency } from "../utils/money.js";
import dayJs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryoptions.js";
import { paymentSummaryfunction } from "./paymentsummary.js";



export function orderSummaryfunction() {


    let cartBox = "";

    cart.cartItems.forEach((cartItem) => {
      const productId = cartItem.productId; // Correct the typo here
      console.log("Product ID:", productId);  // Debug log for productId

      // Find the product by matching productId
      let matchingProduct = products.find((product) => product.id === productId);

      if (!matchingProduct) {
        console.log(`No matching product found for productId: ${productId}`);
        return;  // Skip this cart item if no product is found
      }
      let  deliveryOptionDate ;
      deliveryOptions.forEach ((Options) => {
        if (Options.id === cartItem.deliveryOptionsId) {
          deliveryOptionDate = Options.days;
        }
      })

      const today = dayJs();
      const deliveryDate = today.add(deliveryOptionDate,'days');
      const formatedDate = deliveryDate.format("dddd , MMMM D");


      cartBox += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}
      js-item-container-test">
                <div class="delivery-date">
                  Delivery date: ${formatedDate}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      $${matchingProduct.getPriceCents()}
                    </div>
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link js-delete-quantity-${matchingProduct.id} link-primary" data-product-id = ${matchingProduct.id}>
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    
                      ${deliveryOptionsHTML(productId,cartItem)}
                    
                    
                    
                  </div>
                </div>
              </div>`;})

    function deliveryOptionsHTML(productId,cartItem) {
      let deliveryHTML = '';
      
      deliveryOptions.forEach ((deliveryOptions) => {
        const today = dayJs();
        const ischecked = deliveryOptions.id === cartItem.deliveryOptionsId;
        const deliveryDate = today.add(deliveryOptions.days,'days');
        const formatedDate = deliveryDate.format("dddd , MMMM D");
        const price  = deliveryOptions.priceCents === 0 ? 'FREE-' : `${formattedCurrency(deliveryOptions.priceCents)}-`;
        deliveryHTML +=
        `<div class="delivery-option js-delivery-option" data-product-id = ${productId} data-delivery-option-id = ${deliveryOptions.id} >
        <input type="radio" ${ischecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${productId}">
      <div>
        <div class="delivery-option-date">
        ${formatedDate}
        </div>
        <div class="delivery-option-price">
          $${price} Shipping
        </div>
      </div>
      </div>`
      })
      return deliveryHTML;
    }
    const orderSummary = document.querySelector('.js-order-summary');
    if (orderSummary) {
      orderSummary.innerHTML = cartBox;
    } else {
      console.error("Element '.js-order-summary' not found in the DOM.");
    }


    document.querySelectorAll('.delete-quantity-link').forEach((link) =>{
      link.addEventListener('click',() => {
        const {productId} = link.dataset;
        cart.deleteCart(productId);
        paymentSummaryfunction();
      })
    })

    document.querySelectorAll('.js-delivery-option').forEach((link) => {
      link.addEventListener('click',() => {
        const {productId , deliveryOptionId} = link.dataset;
        console.log(productId,deliveryOptionId)
        cart.updateDeliveryOption(productId,deliveryOptionId);
        orderSummaryfunction();
        paymentSummaryfunction();
      })
    })

  }
