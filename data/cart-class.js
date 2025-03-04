class Cart{
  cartItem;
  #storagekey;

  constructor(storagekey){
    this.#storagekey=storagekey;
    this.#loadFromStorage();
  }
  
  #loadFromStorage(){
    this.cartItem= JSON.parse(localStorage.getItem(this.#storagekey));

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
  }

  saveToStorage(){
    localStorage.setItem(this.#storagekey, JSON.stringify(this.cartItem));
  }

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
  }

  removeFromCart(productId){
    const newCart=[]

    this.cartItem.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem)
      }
    })

    this.cartItem=newCart

    this.saveToStorage();
  }

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

const cart= new Cart('cart-oop');
const businesscart=new Cart('cart-business')



console.log(cart);
console.log(businesscart);

console.log(businesscart instanceof Cart)