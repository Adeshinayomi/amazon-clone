import {cart, removeFromCart,updateDeliveryOption} from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions ,getDeliveryOption} from '../../data/deliveryOption.js'
import { renderPaymentSummary } from "./paymentSummary.js";



export function renderOrderSummary(){

let cartSummary='';
cart.forEach((cartItem)=>{
  const productId = cartItem.productId;

 const matchingProducts= getProduct(productId)


  const deliveryOptionId =cartItem.deliveryOptionId;

  const deliveryOption= getDeliveryOption(deliveryOptionId)

  const today= dayjs();
  const deliveryDate= today.add(deliveryOption.deliveryDays,'days');
  const dateString= deliveryDate.format('dddd, MMM D');
 cartSummary+= `
            <div class="cart-item-container js-cart-item-container js-cart-item-${matchingProducts.id}">
            <div class="delivery-date">
              Delivery date:${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProducts.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProducts.name}
                </div>
                <div class="product-price">
                  ${matchingProducts.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProducts.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link js-delete-link-${matchingProducts.id} link-primary js-delete-link" data-product-id="${matchingProducts.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHtml(matchingProducts,cartItem)}
              </div>
            </div>
          </div>
  `
})


function deliveryOptionsHtml(matchingProducts,cartItem){
  let html = ""
  deliveryOptions.forEach((deliveryOption)=>{
    const today= dayjs();
    const deliveryDate= today.add(deliveryOption.deliveryDays,'days');
    const dateString= deliveryDate.format('dddd, MMM D');

    const priceString= deliveryOption.priceCents === 0? 'FREE Shipping' : `$${formatCurrency(deliveryOption.priceCents)}- Shipping`
    const isChecked= deliveryOption.id === cartItem.deliveryOptionId
    html+=`     
     <div class="delivery-option js-delivery-option" data-product-id="${matchingProducts.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProducts.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
     </div>
    `
  })
  return html
}

document.querySelector('.js-order-summary').innerHTML=cartSummary

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
   const productId= link.dataset.productId
   removeFromCart(productId)
   const conatainer= document.querySelector(`.js-cart-item-${productId}`)
   
   conatainer.remove()

   renderPaymentSummary();
  })
})

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=element.dataset
    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary()
    renderPaymentSummary()
  })
})

}