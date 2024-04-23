import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

elem = 'null';
#categories = [];


  constructor(categories = this.#categories) {

    this.#categories = categories;

    this.elem = this.#renderRibbon();

    this.#renderActiveItems();

    this.#initCarousel();

    this.#ChooseCategory();
  }



  #renderRibbon() {

    return createElement(`
    
    <div class="ribbon">
    
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">     
       ${ this.#categories.map( (obj) => `
            <a href="#" class="ribbon__item" data-id="${obj.id}">${obj.name}</a> 
       `).join('')}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    
    `)
  }


  #renderActiveItems() {
    
    const tagsA = Array.from(this.elem.querySelectorAll('.ribbon__item'));

    tagsA[0].classList.add('ribbon__item_active');
    tagsA[tagsA.length-1].setAttribute('data-id', `${tagsA[tagsA.length-1].getAttribute('data-id')} ribbon__item_active`) ;
  }


  #initCarousel() {

  const leftButton = this.elem.querySelector('.ribbon__arrow_left');
  const rightButton = this.elem.querySelector('.ribbon__arrow_right');
  
  const carousel = this.elem.querySelector('.ribbon__inner');
  
  const step = 350; // костыль
 

  
  function check_Picture_Left_Side() {
  
    return (carousel.scrollLeft - step < 1)? true : false;
  }
   
  function check_Picture_Right_Side() {
   
  let scrollRight = carousel.scrollWidth - carousel.scrollLeft - carousel.clientWidth - step ; 

    return (scrollRight < 1)? true : false;
  }

  

  if (check_Picture_Left_Side()) {
    leftButton.classList.remove('ribbon__arrow_visible');
    rightButton.classList.add('ribbon__arrow_visible');

  }
  else if(check_Picture_Right_Side()) {
    rightButton.classList.remove('ribbon__arrow_visible');
    leftButton.classList.add('ribbon__arrow_visible');
  }


//////////////////////////////////////////////////////////////


leftButton.addEventListener('click', () => {

  if (check_Picture_Right_Side()) 
  rightButton.classList.add('ribbon__arrow_visible');

  carousel.scrollBy(-step, 0);
 
  if (check_Picture_Left_Side()) 
  leftButton.classList.remove('ribbon__arrow_visible');


})

//////////////////////////////////////////////////////////////////////////

rightButton.addEventListener('click', () => {                    

    
    if (check_Picture_Left_Side()) 
      leftButton.classList.add('ribbon__arrow_visible');
 
    carousel.scrollBy(step, 0);
 
     if (check_Picture_Right_Side()) 
      rightButton.classList.remove('ribbon__arrow_visible');

   })

  }


  #ChooseCategory() {

    const tagsA= Array.from(this.elem.querySelectorAll('.ribbon__item'));


    tagsA.map( (a, i) => {a.addEventListener("click", (e) => {  
     
     e.preventDefault();
 
     tagsA.map( (a) => {
       if(a.classList.contains("ribbon__item_active"))
          a.classList.remove("ribbon__item_active");     
     })     
 
           a.classList.add("ribbon__item_active");
 
       a.dispatchEvent(new CustomEvent("ribbon-select", {
           detail: this.#categories[i].id, 
           cancelable: true,
           bubbles: true,
       })) 
     })})


  }
}

