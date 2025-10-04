import { orderSummaryfunction } from "./checkout/ordersummary.js";
import{paymentSummaryfunction} from "./checkout/paymentsummary.js";
import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts,loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


Promise.all([
    loadProductFetch(),
    new Promise((resolve) => {
        loadCart(()=>{
        resolve();
    })})

]).then(()=>{
    paymentSummaryfunction();
     orderSummaryfunction();
})


/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve();
    })
}).then((valueFromReslove)=>{
    return new Promise((resolve) => {
        loadCart(()=>{
        resolve();
    })})

}).then(() =>{
     paymentSummaryfunction();
     orderSummaryfunction();
})*/

/*
 loadProducts(()=>{
    loadCart(()=>{
         paymentSummaryfunction();
         orderSummaryfunction();
     })

 })*/

