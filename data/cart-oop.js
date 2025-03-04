function Cart(storagekey){
  const cart={
    cartItem:undefined,
  
     loadFromStorage: function(){
      this.cartItem= JSON.parse(localStorage.getItem(storagekey));
  
      if(!this.cartItem){
        this.cartItem = [
          {
            productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:2,
            deliveryOptionId:'1',
          },
          {
            productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity:1,
            deliveryOptionId:'2',
          }
        ];
      }
    },
  
     saveToStorage(){
      localStorage.setItem(storagekey, JSON.stringify(this.cartItem));
    },
  
    
    addToCart(productId){
      let matchingItem;
  
  
      this.cartItem.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem=cartItem
        }
      })
      if(matchingItem){
        matchingItem.quantity ++
      }else{
        this.cartItem.push({
          productId:productId,
          quantity:1,
          deliveryOptionId:'1' 
        });
      }
  
      this.saveToStorage();
    },
  
      
    removeFromCart(productId){
      const newCart=[]
  
      this.cartItem.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
          newCart.push(cartItem)
        }
      })
  
      this.cartItem=newCart
  
      this.saveToStorage();
    },
  
    updateDeliveryOption(productId,deliveryOptionId){
      let matchingItem;
  
  
      this.cartItem.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem=cartItem
        }
      });
  
      matchingItem.deliveryOptionId = deliveryOptionId;
  
  
     this.saveToStorage();
    }
  }
  
  return cart
}

const cart= Cart('cart-oop');
const businesscart=Cart('cart-business')

cart.loadFromStorage()



businesscart.loadFromStorage()


console.log(businesscart)
console.log(cart)