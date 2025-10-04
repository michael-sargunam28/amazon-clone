import { cart } from "../../data/cart-class.js";

describe('test suite : cart ',()=> {
    it ('add a existing product',() => {
     
        spyOn(localStorage,'setItem');
        cart.cartItems = [
            {
                productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
                quantity: 1,
                deliveryOptionsId :'2'
            }
        ]
        
        cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(cart.cartItems[0].quantity).toEqual(2);
    })
    it('add  a new product',()=> {
        cart.cartItems =[];
        spyOn(localStorage,'setItem');
        
        cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(cart.cartItems[0].quantity).toEqual(1);
    })
})