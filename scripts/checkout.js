import { orderSummaryfunction } from "./checkout/ordersummary.js";
import{paymentSummaryfunction} from "./checkout/paymentsummary.js";
import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";

loadProducts(()=>{
paymentSummaryfunction();
orderSummaryfunction();
})

