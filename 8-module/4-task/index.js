import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if(!product)
      return;
    
      const index = this.cartItems.findIndex(obj => obj.product.name === product.name);

      if (index > -1)
      this.cartItems[index].count += 1;
      else
      this.cartItems.push({product: product, count: 1})

      this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex(obj => obj.product.id === productId);

    if (index === -1)
    return

    if (amount === 1) {    
      this.cartItems[index].count += 1;
    } else {  
      if(this.cartItems[index].count === 1)
        this.cartItems.splice(index, 1);
      else
        this.cartItems[index].count -= 1;
    }

    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return (this.cartItems.length === 0)? true : false;
  }

  getTotalCount() {
    const sum = this.cartItems.reduce(function (currentSum, obj) {
      return currentSum + obj.count
    }, 0);

    return sum
  }

  getTotalPrice() {
    const sum = this.cartItems.reduce(function (currentSum, obj) {
      return currentSum + obj.product.price * obj.count
    }, 0);

    return sum
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
  let modal = new Modal();
    modal.setTitle('Your order');

    let shoppingList = document.createElement('div');

    for (let i = 0; i < this.cartItems.length; i++)
    shoppingList.append(this.renderProduct(this.cartItems[i].product, this.cartItems[i].count));

    

    shoppingList.append(this.renderOrderForm());

    modal.setBody(shoppingList);
    modal.open();

    


    let buttonPlus = Array.from(document.querySelectorAll('.cart-product'));

    buttonPlus.forEach(function (elem) {
      elem.addEventListener('click', function (e) {

       
        // alert(`${elem.closest('data-product-id')}`);
        // alert(elem.closest("productId"));
        alert(`${elem.dataset.productId}`);
        alert(`${e.target.className}`)
       
      
      })
    })


   

   
  }





  onProductUpdate(cartItem) {
    // ...ваш код

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}



    // let modal = new Modal();
    // modal.setTitle('Your order');

    // let shoppingList = document.createElement('div');

    // for (let i = 0; i < this.cartItems.length; i++)
    // shoppingList.append(this.renderProduct(this.cartItems[i].product, this.cartItems[i].count));

    

    // shoppingList.append(this.renderOrderForm());

    // modal.setBody(shoppingList);
    // modal.open();




    // let buttonPlus = Array.from(shoppingList.querySelectorAll('.cart-counter__button cart-counter__button_plus'));

    // buttonPlus.forEach(function (elem) {
    //   elem.addEventListener('click', function (e) {

    //    alert(e.querySelector('.data-product-id'));
      
    //   })
    // })



    // let buttonPlus = Array.from(document.querySelectorAll('.cart-product'));

    // buttonPlus.forEach(function (elem) {
    //   elem.addEventListener('click', function () {

    //     alert('hi');
    //     alert(`${elem.dataset.productId}`);
    //     alert(`${event.target.className}`)
    //    alert(this.querySelector('.data-product-id'));
      
    //   })
    // })