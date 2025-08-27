import {cart,cartCount} from '../../data/cart.js'
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { products,getProduct } from '../../data/products.js';
import { moneyCal } from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';


export function renderPaymentSummary(){

    //Delivery and Handeling Charges
    function handlingChargesCal(){
        let handlingCharges=0;
        cart.forEach((cartItem)=>{
        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        handlingCharges+= deliveryOption.priceCents;
    }); 
    return handlingCharges;
    }
    
    //Total Price Calcualtion
    function priceOfCart(){
        let price=0;
        cart.forEach((cartItem)=>{
            let product = getProduct(cartItem.productId);
            price += product.priceCents*cartItem.quantity;
        });
        return price;
    }

    let totalAmount=Number(handlingChargesCal()+priceOfCart());
    let taxAmouont=Number((totalAmount*0.01).toFixed(2));
    let paymentHTML=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartCount()}):</div>
            <div class="payment-summary-money">$${moneyCal(priceOfCart())}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${moneyCal(handlingChargesCal())}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${moneyCal(totalAmount)}</div>
            </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${moneyCal(taxAmouont)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${moneyCal(taxAmouont+totalAmount)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
            `;

    document.querySelector('.js-payment-summary').innerHTML=paymentHTML;
}