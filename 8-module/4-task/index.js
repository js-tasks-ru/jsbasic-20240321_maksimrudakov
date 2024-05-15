import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  #elemCartProduct = null;

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

      this.onProductUpdate(this.cartItems);
  }

  updateProductCount = (productId, amount) => {
    const index = this.cartItems.findIndex(obj => obj.product.id === productId);

    if (index === -1)
    return

      this.cartItems[index].count += amount;
   
    this.onProductUpdate(this.cartItems);
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
    return createElement(`
    <form class="cart-form">
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
  this.modal = new Modal();

  this.modal.setTitle('Your order');

    let shoppingList = document.createElement('div');

    for (let i = 0; i < this.cartItems.length; i++)
    shoppingList.append(this.renderProduct(this.cartItems[i].product, this.cartItems[i].count));
                                           
    shoppingList.append(this.renderOrderForm());

    this.modal.setBody(shoppingList);
    this.modal.open();
 

    this.addEvents(); // создаем обработчиков на кнопки

    this.buttonSubmit = document.querySelector('button[type="submit"]');
    
  }

 addEvents() {
      let listProduct = Array.from(document.querySelectorAll('.cart-product'));

      listProduct.forEach( elem => {
        this.#elemCartProduct = elem;
        let buttonPlus = elem.querySelector('.cart-counter__button_plus');
        buttonPlus.addEventListener('click', this.addPlus);

      let buttonMinus = elem.querySelector('.cart-counter__button_minus');
      buttonMinus.addEventListener('click', this.addPMinus);
      });

      this.form = document.querySelector('.cart-form');
      this.form.addEventListener('submit', this.onSubmit);
 }


addPlus = (event) => {
  const product = event.target.closest('.cart-product');
this.updateProductCount(product.dataset.productId, 1);
}



addPMinus = (event) => {
  const product = event.target.closest('.cart-product');
this.updateProductCount(product.dataset.productId, -1);
}



  removeEvents() {
    let listProduct = Array.from(document.querySelectorAll('.cart-product'));

      listProduct.forEach( elem => {
        let buttonPlus = elem.querySelector('.cart-counter__button_plus');
        buttonPlus.removeEventListener('click', this.addPlus);

      let buttonMinus = elem.querySelector('.cart-counter__button_minus');
      buttonMinus.removeEventListener('click', this.addPMinus);
      });

      // this.form = document.querySelector('.cart-form');
      this.form.removeEventListener('submit', this.onSubmit);
  }



  onProductUpdate = (cartItem) => {
    let openModal = document.querySelector('.is-modal-open');

    if(openModal){
      const modalBody = document.querySelector('.modal__body');

      let summPrice = 0;
      cartItem.forEach( (elem, i) => {
         // Элемент, который хранит количество товаров с таким productId в корзине
         let productCount = modalBody.querySelector(`[data-product-id="${elem.product.id}"] .cart-counter__count`);
         productCount.textContent = elem.count;
         // Элемент с общей стоимостью всех единиц этого товара
        let productPrice = modalBody.querySelector(`[data-product-id="${elem.product.id}"] .cart-product__price`);
        productPrice.textContent = `€${(elem.product.price * elem.count).toFixed(2)}`;

        summPrice += elem.product.price * elem.count;

         if(cartItem[i].count === 0) {
          // Корневой элемент товара
          let product = modalBody.querySelector(`[data-product-id="${elem.product.id}"]`);
          product.remove();

          cartItem.splice(i, 1);
         }      
      })

      // Элемент с суммарной стоимостью всех товаров
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      infoPrice.textContent = `€${summPrice.toFixed(2)}`;
    }  
    if(this.getTotalCount() === 0)
    this.modal.close();

    this.cartIcon.update(this);
  }





  onSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData(this.form);
  
      const promiseResponse = fetch('https://httpbin.org/post', {
        body: formData,
        method: 'POST',
      });
         
      promiseResponse
      .then((response) => {
        this.buttonSubmit.classList.add('is-loading');
        this.modal.setTitle('Success!');
        this.cartItems.length = 0;
        this.modal.setBody( createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
       </div>
        `));
        this.removeEvents();
      })  
      .catch(() => {
        console.error(error);
      });  
    }
   
  

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
