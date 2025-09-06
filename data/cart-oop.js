function Cart(localSotrageKey){
    let cart = {
    cartItems: undefined,
    loadFromStorage(){
        this.cartItem = JSON.parse(localStorage.getItem(localSotrageKey));
        if(!this.cartItems){
            this.cartItems = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: '1'
        },{ productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }];
        }
    },
    saveToStorage(){
        localStorage.setItem(localSotrageKey,JSON.stringify(this.cartItem));
    },

    resetCart() {
        this.cartItems = [];
    },

    addToCart(productId,product_increement=1){
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
        this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingcartItem=cartItem;
            }
        });
        if(matchingcartItem){
            matchingcartItem.quantity+=product_increement;
        }else{
            this.cartItems.push({
                productId,
                quantity:product_increement,
                deliveryOptionId: '1'
            })
        }
        this.saveToStorage();
    },

    removeFromCart(productId){
        let newCart=[];
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });
        cart = newCart;
        this.saveToStorage();
    },

    cartCount(){
        let cartQuantity=0;
            this.cartItems.forEach((product)=>{
                cartQuantity+=product.quantity;
            });
        return cartQuantity;
    },

   updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;
    this.saveToStorage();
    },


    updateDeliveryOption (productId,deliveryOptionId){
        let matchingProduct;
        this.cartItems.forEach((cartItem)=>{
            if (cartItem.productId === productId){
                matchingProduct = cartItem;
            }
        });

        matchingProduct.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }

};
    return cart;
}


let cart = Cart('cart-oop');
let businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);











