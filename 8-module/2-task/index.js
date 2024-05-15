import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';


export default class ProductGrid {
  elem = '';
  products = [];

  #filters = {
      noNuts: false, // true/false
      vegeterianOnly: false, // true/false
      maxSpiciness: 0, // числа от 0 до 4
      category: '' // уникальный идентификатор категории товара
  };

  constructor(products) {
    this.products = products || this.products;

   
    this.elem = this.#render();

    this.productsTag = this.elem.querySelector('.products-grid__inner');

    this.#addProducts(this.products);
  }
  



  #render() {

      return createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);
  }




  updateFilter(filters) {

      this.#filters = Object.assign({}, this.#filters, filters);


      const createProducts = this.products.filter( product => {       
        if (this.#filters.noNuts && product.nuts) {
          return false;
        }
  
        if (this.#filters.vegeterianOnly && !product.vegeterian) {
          return false;
        }
  
        if (this.#filters.maxSpiciness && product.spiciness > this.#filters.maxSpiciness) {
          return false;
        }
  
        if (this.#filters.category && product.category !== this.#filters.category) {
          return false;
        }
  
        return true;     
   })

  this.productsTag.textContent = '';
  this.#addProducts(createProducts);
  }




  #addProducts(products) {

    products.forEach(element => {      
      let tempElem = new ProductCard(element);

      this.productsTag.append(tempElem.elem);
    });

  }

}  