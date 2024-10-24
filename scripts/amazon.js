let productHTML = ''
products.forEach ( (products) => {
    productHTML += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(products.priceCents /100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-cart-${products.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = ${products.id}>
            Add to Cart
          </button>
        </div>`
})

document.querySelector('.products-grid').innerHTML = productHTML;
//clearing Timeout
const addedCartTimeOut ={};

document.querySelectorAll('.js-add-to-cart').forEach((value) => {
  value.addEventListener('click',() => {
    const {productId} = value.dataset;
    let matching;
    cart.forEach((item) => {
      if(item.productId === productId) {
        matching = item;
      }
      
    });

    
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)
    const quantity = Number(quantitySelector.value);
    if(matching) {
      matching.quantity += quantity;
    }
    else {
      cart.push(
        {productId : productId,
        quantity : quantity,}
      )
    }

    console.log(cart)
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    
    //inside this object we use f2c47db9-8ab0-4f79-a68c-3d2e7eab47f5 : timeOut Id
    const previousTimeOutId = addedCartTimeOut[productId];
    const addedCart = document.querySelector(`.js-added-cart-${productId}`);
    addedCart.classList.add('added-to-cart-clicked');
    if(previousTimeOutId) {
      clearTimeout(previousTimeOutId);
    }
    
      const timeOut = setTimeout(() => {
        addedCart.classList.remove('added-to-cart-clicked');
  
      },2000);
      
      addedCartTimeOut[productId] = timeOut;
    
    
    
  })
})

    