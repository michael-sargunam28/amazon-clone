import { orderSummaryfunction } from "../../scripts/checkout/ordersummary.js";
import { cart ,getFromStorage} from "../../data/cart.js";

describe('test suite : orderSummary',() => {
    const pID = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
    beforeEach(()=>{
        document.querySelector('.js-test-container').innerHTML =
        `<div class = "js-order-summary"></div>
        <div class = "js-payment-summary"></div>

        `;
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake( ()=> {
            return JSON.stringify([{
                productId: pID,
                quantity: 1,
                deliveryOptionsId :'2'
              }]
            )
        });
        getFromStorage();
        orderSummaryfunction();
    })
    it('display the cart',() => {
        
        expect(document.querySelectorAll('.js-item-container-test').length).toEqual(1);
        expect(document.querySelector(`.js-product-quantity-${pID}`).innerText).toContain('Quantity: 1');
    });


    it('check the behaviour of the page', ()=> {
       
        document.querySelector(`.js-delete-quantity-${pID}`).click();
        expect(document.querySelectorAll('.js-item-container-test').length).toEqual(0);
        expect(document.querySelector(`.js-product-quantity-${pID}`)).toEqual(null);


    })
 afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML = null;
 })
});