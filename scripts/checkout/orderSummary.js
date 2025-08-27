import {cart,removeFromCart,cartCount,updateQuantity,cartCount as updateCartQuantity , updateDeliveryOption} from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { products } from '../../data/products.js';
import {moneyCal} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function renderOrderSummary(){
    let summaryHTML='';
cart.forEach((cartItem)=>{
    const productId=cartItem.productId;
    let matchingProduct;    
    products.forEach((product)=>{
        if(productId === product.id){
            matchingProduct = product;
        }
    });
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;
    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const formatedDate=deliveryDate.format('dddd, MMMM D');

    summaryHTML+= 
        `
            <div class="cart-item-container js-checkout-items-${matchingProduct.id} ">
                <div class="delivery-date">
                Delivery date: ${formatedDate}
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
                        ${deliveryOptionsHTML(matchingProduct,cartItem)}
                    </div>
                </div>
            </div>
    `
})

document.querySelector('.js-checkout-products').innerHTML = summaryHTML;

//Generate Date HTML
function deliveryOptionsHTML(matchingProduct,cartItem){
    let html = ``;
    deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const formatedDate=deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0.00 ? 'FREE': `$${moneyCal(deliveryOption.priceCents)}`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html+=`
    <div class="delivery-option js-delivery-option" data-product-id=${matchingProduct.id} data-delivery-option-id=${deliveryOption.id}>
            <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
        <div>
            <div class="delivery-option-date">
            ${formatedDate}
            </div>
            <div class="delivery-option-price">
            ${priceString} Shipping
        </div>
    </div>
    </div>    
    `;
    });
    return html;

}

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


document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
        const {productId,deliveryOptionId}=element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();

    })
});
}