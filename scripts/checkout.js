import {cart,removeFromCart,cartCount,updateQuantity,cartCount as updateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import {moneyCal} from './utils/money.js';


let summaryHTML='';
cart.forEach((cartItem)=>{
    const productId=cartItem.productId;
    let matchingProduct;    
    products.forEach((product)=>{
        if(productId === product.id){
            matchingProduct = product;
        }
    })
    summaryHTML+= 
        `
            <div class="cart-item-container js-checkout-items-${matchingProduct.id} ">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src=${matchingProduct.image}>

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    ${moneyCal(matchingProduct.priceCents)} 
                    </div>
                    <div class="product-quantity js-cart-item-container-${matchingProduct.id}">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link js-checkout-items-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                        Update
                    </span>
                    <input class="quantity-input js-input-quantity-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-link"
                    data-product-id="${matchingProduct.id}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id ="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    `
})

document.querySelector('.js-checkout-products').innerHTML = summaryHTML;

//CartItem Remove 
document.querySelectorAll(".js-delete-link").forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
        let container = document.querySelector(`.js-checkout-items-${productId}`);
        console.log(container);
        container.remove();
    });
})

document.querySelector(".js-cart-quantity-head").innerHTML= cartCount();


//cart update
document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
    });
});


document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');
      const newQuantity = Number(document.querySelector(`.js-input-quantity-${productId}`).value);
        if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }
      updateQuantity(productId,newQuantity);

       const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
      document.querySelector(".js-cart-quantity-head").innerHTML= cartCount();
    });
  });