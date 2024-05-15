
import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {

      //////////СОЗДАНИЕ БАЗОВЫХ КОМПОНЕНТОВ//////////
    // вставка карусели
    this.carousel = new Carousel(slides);
    this.carouselElement = document.querySelector('[data-carousel-holder]');
    this.carouselElement.append(this.carousel.elem);

    // вставка меню
    this.ribbonMenu = new RibbonMenu(categories);
    this.ribbonElement = document.querySelector('[data-ribbon-holder]');
    this.ribbonElement.append(this.ribbonMenu.elem);

    // вставка слайдера
    this.stepSlider = new StepSlider({steps:5, value:3});    
    this.sliderElement = document.querySelector('[data-slider-holder]');
    this.sliderElement.append(this.stepSlider.elem);

    // вставка иконы корзины
    this.cartIcon = new CartIcon();
    this.cartIconElement = document.querySelector('[data-cart-icon-holder]');
    this.cartIconElement.append(this.cartIcon.elem);

    // создание корзины 
    this.cart = new Cart(this.cartIcon);

    this.nuts = document.getElementById('nuts-checkbox');
    this.nuts.addEventListener('change', (event) => this.productGrid.updateFilter({ noNuts: event.target.checked }));

    this.vegetarian = document.getElementById('vegeterian-checkbox');
    this.vegetarian.addEventListener('change', (event) => this.productGrid.updateFilter({ vegeterianOnly: event.target.checked }));

    document.addEventListener('slider-change', (event) => this.productGrid.updateFilter({ maxSpiciness: event.detail }));

    document.addEventListener('ribbon-select', (event) => this.productGrid.updateFilter({ category: event.detail }));
    
    document.body.addEventListener('product-add', (event) => {
      const productToAdd = this.json.find((product) => product.id === event.detail);

      if (!productToAdd) {
        return;
      }

      this.cart.addProduct(productToAdd);
    });
  }




  async render() {

    ////////// ПОКАЗ СПИСКА ТОВАРОВ//////////
    const response = await fetch('products.json');
      if (response.ok) {   
      this.json = await response.json();

      // вставка фильтра продуктов
      this.productGrid = new ProductsGrid(this.json);
      this.gridElement = document.querySelector('[data-products-grid-holder]');
      this.gridElement.innerHTML = '';
      this.gridElement.append( this.productGrid.elem);

    /////////ФИЛЬТРАЦИЯ ТОВАРОВ ПОСЛЕ ПОЛУЧЕНИЯ С СЕРВЕРА/////////////
      this.productGrid.updateFilter({
         noNuts: this.nuts.checked,
         vegeterianOnly: this.vegetarian.checked,
         maxSpiciness: this.stepSlider.value,
         category: this.ribbonMenu.value
       });

      } else {
        alert("Ошибка HTTP: " + response.status);
      }
 }
}