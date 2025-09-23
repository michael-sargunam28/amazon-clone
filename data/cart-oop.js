

const cart ={
    cartItems : undefined,
    //clearing Timeout
    addedCartTimeout : {},

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
    },

    getFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || [];
    },
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
        
        

        
    },

    saveTOStorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },

    updateDeliveryOption(productId,deliveryOptionsId) {
        let matching;
        this.cartItems.forEach((item) => {
            if (item.productId === productId) {
            matching = item;
            }
        });

        matching.deliveryOptionsId = deliveryOptionsId;
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },
     quantity : 0,
    updateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((item) => {
            cartQuantity += item.quantity;
        });

        //document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
        this.quantity = cartQuantity;

    },
    deleteCart(productId) {
        let newCart = [];
            this.cartItems.forEach((products) => {
            if (products.productId !== productId) {
                newCart.push(products);
            }

            });
            this.cartItems = newCart;
            localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));

            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            document.addEventListener("DOMContentLoaded",() =>{
            this.updateCartQuantity();});
    

    }

}

localStorage.clear();
cart.getFromStorage();
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

// cart.updateDeliveryOption('54e0eccd-8f36-462b-b68a-8182611d9add',1);
cart.updateCartQuantity();

console.log(cart.quantity);
console.log(cart);
 


 

 

 



 