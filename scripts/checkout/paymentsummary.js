import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryoptions.js";
import { formattedCurrency } from "../utils/money.js";
export function paymentSummaryfunction() {
   let paymentsummary = "";
   let itemsPrice = 0;
   let deliveryPrice = 0;
   let taxPrice = 0;
   let beforeTaxPrice = 0;
   let totalPrice = 0;
   cart.forEach((cartItem)=> {
    const productId = cartItem.productId; // Correct the typo here
      console.log("Product ID:", productId);  // Debug log for productId

      // Find the product by matching productId
      let matchingProduct = products.find((product) => product.id === productId);
       deliveryOptions.forEach ((Options) => {
              if (Options.id === cartItem.deliveryOptionsId) {
                deliveryPrice += Options.priceCents;
              }
            })
      itemsPrice += (matchingProduct.priceCents)*cartItem.quantity;
      
      
     
   });
   beforeTaxPrice = itemsPrice + deliveryPrice ;
   taxPrice = (beforeTaxPrice*0.1);
   totalPrice = beforeTaxPrice + taxPrice;
  
   

paymentsummary = `<div class="payment-summary-title">
Order Summary
</div>

<div class="payment-summary-row">
<div>Items (3):</div>
<div class="payment-summary-money">$${formattedCurrency(itemsPrice)}</div>
</div>

<div class="payment-summary-row">
<div>Shipping &amp; handling:</div>
<div class="payment-summary-money">$${formattedCurrency(deliveryPrice)}</div>
</div>

<div class="payment-summary-row subtotal-row">
<div>Total before tax:</div>
<div class="payment-summary-money">$${formattedCurrency(beforeTaxPrice)}</div>
</div>

<div class="payment-summary-row">
<div>Estimated tax (10%):</div>
<div class="payment-summary-money">$${formattedCurrency(taxPrice)}</div>
</div>

<div class="payment-summary-row total-row">
<div>Order total:</div>
<div class="payment-summary-money">$${formattedCurrency(totalPrice)}</div>
</div>

<button class="place-order-button button-primary">
Place your order
</button>`;
const paymentsummaryHTML = document.querySelector('.js-payment-summary');
paymentsummaryHTML.innerHTML = paymentsummary;
  }