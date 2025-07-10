import { cart,addToCart,getFromStorage } from "../../data/cart.js";

describe('test suite : cart ',()=> {
    it ('add a existing product',() => {
        spyOn(localStorage,'getItem').and.callFake( ()=> {
            return JSON.stringify([{
                productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
                quantity: 1,
                deliveryOptionsId :'2'
              }]
            )
        });
        spyOn(localStorage,'setItem');
        getFromStorage();
        addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(cart[0].quantity).toEqual(2);
    })
    it('add  a new product',()=> {
        spyOn(localStorage,'getItem').and.callFake( ()=> {
            return JSON.stringify([])
        });
        spyOn(localStorage,'setItem');
        getFromStorage();
        addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(cart[0].quantity).toEqual(1);
    })
})