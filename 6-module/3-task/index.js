import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  elem = 'null';
  #slides = [];

  constructor(slides) {

    this.#slides = slides;

    this.elem = createElement(`
  
  <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">
    
    ${ this.#slides.map((obj) => ` 
    <div class="carousel__slide" data-id="${obj.id}">
        <img src="/assets/images/carousel/${obj.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${obj.price.toFixed(2)}</span>
          <div class="carousel__title">${obj.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`).join('\n')}
  </div>
  `)

  this.#initCarousel();
 
  }

#initCarousel = () => {

  const leftButton = this.elem.querySelector('.carousel__arrow_left');
  const rightButton = this.elem.querySelector('.carousel__arrow_right');

  const carousel = this.elem.querySelector('.carousel__inner');
  const step = carousel.offsetWidth;
  let currentStep = 0;

  const countPictures = (carousel.getElementsByClassName('carousel__slide')).length;


  if (currentStep == 0) 
  leftButton.style.display = 'none';
  
  
////////////////////////////////////////////////////////////////////

 rightButton.addEventListener('click', () => {                    

   if (currentStep == 0) 
   leftButton.style.display = '';

    currentStep -= step;
    carousel.style.transform = `translateX(${currentStep}px)`;


    if (currentStep == -step * (countPictures-1)) 
   rightButton.style.display = 'none';
  })

////////////////////////////////////////////////////////////////////

  leftButton.addEventListener('click', () => {

    if (currentStep == -step * (countPictures-1)) 
    rightButton.style.display = '';

    currentStep += step;
    carousel.style.transform = `translateX(${currentStep}px)`;


    if (currentStep == 0) 
    leftButton.style.display = 'none';
  })

///////////////////////////////////////////////////////////////////
}

}
