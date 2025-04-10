import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js'
async function loadpage(){
  try{
    // throw 'error1'
    
    await loadProductsFetch()

    const value = await new Promise((resolve,reject)=>{
      // throw 'error2'
      loadCart(()=>{
        // reject('error3')
        resolve('value3')
      })
    })
  } catch(error){
    console.log('Unexpected error.Please try again later.')
  }


  renderOrderSummary();
  renderPaymentSummary(); 


}
loadpage();
/*
  Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
      loadCart(()=>{
        resolve()
      })
    })

  ]).then((value)=>{
    console.log(value)
    renderOrderSummary();
    renderPaymentSummary(); 
  })

// new Promise((resolve)=>{
//   loadProducts(()=>{
//     resolve('value1')
//   })
// }).then((value)=>{
//   console.log(value)

//   return new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve()
//     })
//   })
// }).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary(); 
// })
/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary(); 
  })
})
*/