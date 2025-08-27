export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart || cart.length === 0){
    cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionId: '1'
},{ productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
}];
}


export function saveToStorage() {
    localStorage.setItem('cart',JSON.stringify(cart));
}

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
            quantity:product_increement,
            deliveryOptionsId: '1'
        })
    }
    saveToStorage();
}

export function removeFromCart(productId){
    let newCart=[];
    cart.forEach((cartItem)=>{
        if (cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToStorage();
}

export function cartCount(){
    let cartQuantity=0;
        cart.forEach((product)=>{
            cartQuantity+=product.quantity;
        });
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  console.log(matchingItem.quantity);
  saveToStorage();
}

export function updateDeliveryOption (productId,deliveryOptionId){
    let matchingProduct;
    cart.forEach((cartItem)=>{
        if (cartItem.productId === productId){
            matchingProduct = cartItem;
        }
    });

    matchingProduct.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}