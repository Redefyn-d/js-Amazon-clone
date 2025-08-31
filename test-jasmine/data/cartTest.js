import {addToCart,cart,loadFromStorage} from '../../data/cart.js';


describe('Test Suite: Add to Cart',()=>{
    it ('Adds an existing product to the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        expect(cart.length).toEqual(2); 
    });

    it ('Adds an new product to the cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(2); 
    });
});