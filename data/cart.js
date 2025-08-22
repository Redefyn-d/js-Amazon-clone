export const cart = [{
    ProductId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
},{ ProductId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
}];

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

