export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  elem = '';

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) { // спросить про использование напрямую данный аргумент в коде - что подсвечивается тусклым.

    this.tempProduct = product; 

    if(this.tempProduct === null || this.tempProduct === undefined)
      return;
    
      const index = this.cartItems.findIndex(obj => obj.product.name === this.tempProduct.name);


      if (index)
      cartItems[index].count += 1;
      else
      cartItems.push({product: tempProduct, count: 1})


      this.onProductUpdate(cartItem)

    // ваш код
  }





  updateProductCount(productId, amount) {


    const index = this.cartItems.findIndex(obj => obj.product.id === productId);


    if (amount == 1)
    cartItems[index].count += 1;
    else
    cartItems[index].count -= 1;


    if(cartItems[index].count <= 0)
    cartItems.splice(index, 1);


    this.onProductUpdate(cartItem)


    // ваш код
  }




  isEmpty() {
    
    (cartItems.length)? false: true;
    // ваш код
  }



  
  getTotalCount() {
    // ваш код
  }

  getTotalPrice() {
    // ваш код
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

