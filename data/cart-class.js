

class Cart{
    cartItems = undefined;

    localStorageKey = undefined;
    //clearing Timeout
    addedCartTimeout = {};

    constructor(key) {
        localStorage.clear();
        this.localStorageKey = key;

        this.getFromStorage();
    }

    timeoutForAddedCart(productId) {
        const previousTimeoutId = this.addedCartTimeout[productId];
        const addedCart = document.querySelector(`.js-added-cart-${productId}`);
        addedCart.classList.add("added-to-cart-clicked");
        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }

        const timeout = setTimeout(() => {
            addedCart.classList.remove("added-to-cart-clicked");
        }, 2000);

        this.addedCartTimeout[productId] = timeout;
    };

    getFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    };
    addToCart(productId) {
        let matching;
        this.cartItems.forEach((item) => {
            if (item.productId === productId) {
            matching = item;
            }
        });

        // const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        let quantity = 1; // default

        // if (quantitySelector && !isNaN(Number(quantitySelector.value)) && Number(quantitySelector.value) > 0) {
        // quantity = Number(quantitySelector.value);
        // }


        

        if (matching) {
            matching.quantity += quantity;
        } else {
            this.cartItems.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionsId :'2'
            });
        }

        // Store cart in local storage
        this.saveTOStorage();
        
        

        
    };

    saveTOStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    };

    updateDeliveryOption(productId,deliveryOptionsId) {
        let matching;
        this.cartItems.forEach((item) => {
            if (item.productId === productId) {
            matching = item;
            }
        });

        matching.deliveryOptionsId = deliveryOptionsId;
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    };
     quantity = 0;
    updateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((item) => {
            cartQuantity += item.quantity;
        });

        //document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
        this.quantity = cartQuantity;

    };
    deleteCart(productId) {
        let newCart = [];
            this.cartItems.forEach((products) => {
            if (products.productId !== productId) {
                newCart.push(products);
            }

            });
            this.cartItems = newCart;
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));

            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            document.addEventListener("DOMContentLoaded",() =>{
            this.updateCartQuantity();});
    

    }

}


const  cart = new Cart('cart-class');
const businessCart = new Cart('cart-business');

businessCart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');


cart.updateCartQuantity();
console.log(cart.quantity);
cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',3);
 console.log(cart,businessCart);
 


 

 

 



 