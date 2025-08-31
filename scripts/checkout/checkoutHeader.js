import {cartCount} from '../../data/cart.js'
export function renderCheckoutHeader(){

    let headerCartCount = cartCount();    
let checkoutHeaderHTML = `
    Checkout (<a class="return-to-home-link js-cart-quantity-head"
        href="amazon.html"></a>)   
`;
document.querySelector('.checkout-header').innerHTML = checkoutHeaderHTML;
document.querySelector('.js-cart-quantity-head').innerHTML = headerCartCount;
}