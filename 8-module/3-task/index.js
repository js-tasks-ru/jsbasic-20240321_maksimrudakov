export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

