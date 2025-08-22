export const cart = [];

export function addToCart(productId,product_increement){
    let addedMessageTimeoutId;
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('added-to-cart-visible');
  
    if (addedMessageTimeoutId){
        clearTimeout(addedMessageTimeoutId);
    }
  
    const timeoutId = setTimeout(()=>{
      addedMessage.classList.remove('added-to-cart-visible');
    },2000);
    addedMessageTimeoutId=timeoutId;
    let matchingcartItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingcartItem=cartItem;
        }
    });
    if(matchingcartItem){
        matchingcartItem.quantity+=product_increement;
    }else{
        cart.push({
            productId,
            quantity:product_increement 
        })
    }
}

export function cartCount(){
    let cartQuantity=0;
          cart.forEach((product)=>{
              cartQuantity+=product.quantity;
          });
          document.querySelector(".js-cart-quantity").innerHTML=cartQuantity;
  }