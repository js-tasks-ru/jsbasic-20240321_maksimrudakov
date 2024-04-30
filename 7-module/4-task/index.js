import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {

  elem = 'null';

  #steps = null;
  #value = null;

  constructor({ steps, value = 0 }) {

    this.#value = value;

    this.#steps = steps - 1;

    this.elem = this.#render();

    this.#initSliderSteps();

    this.#initValue();

    this.#selectStep();

    this.#initThumbSlider();

    this.#initStart(); 
  }

  #render() {

    return createElement(`
  <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
  </div>
 `)
  }


  #initStart() {
    this.thumb = this.elem.querySelector('.slider__thumb'); 
    this.progress = this.elem.querySelector('.slider__progress');
    
    this.thumb.addEventListener('pointerdown', this.#onDown);   
    // this.elem.addEventListener('click', this.#onClick);
  }



  #onDown = (event) => {
    event.ondragstart = (e) => e.preventDefault();

    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp);
  };



  #onMove = (event) => {
    this.elem.classList.add("slider_dragging"); // добавим класс

    this.positionSlider = this.elem.getBoundingClientRect().left; // позиция левого края слайдера
    this.widthSlider = this.elem.offsetWidth; // ширина слайдера 

    this.shiftX = event.clientX - this.positionSlider; // позиция курсора относительно слайдера
    this.#value = Math.round((this.shiftX / this.widthSlider) * (this.#steps)); // вычисленное целое значение положения ползунка
  
    let coef = this.shiftX / this.widthSlider; // коэффициент ползунка

    if (coef < 0) {
      coef = 0;
    }
    
    if (coef > 1) {
      coef = 1;
    }
    
    let leftPercents = coef * 100;
    
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
    this.#initValue(); 
    this.#selectStep();
  };




  #onUp = (event) => {
    document.removeEventListener('pointerup', this.#onUp); 
    document.removeEventListener('pointermove', this.#onMove);
    // this.elem.removeEventListener('click', this.#onClick);

    this.#onClick();

     this.elem.dispatchEvent(new CustomEvent("slider-change", {
            detail: this.#value, 
            bubbles: true,
     }))

     this.elem.classList.remove("slider_dragging"); // удалим класс
 };



 #onClick = () => {
  let percents = this.#value / (this.#steps) * 100;

  this.thumb.style.left = `${percents}%`;
  this.progress.style.width = `${percents}%`;
  this.#initValue(); 
  this.#selectStep();
 }



  #initSliderSteps() {    
    let sliderSteps = this.elem.querySelector('.slider__steps');

    for (let i = 0; i <= this.#steps; i++)
        sliderSteps.innerHTML += `<span></span>\n`;

  }



  #initValue() {
    this.elem.querySelector('.slider__value').textContent = this.#value;
  }



  #selectStep() {
    let span = Array.from(this.elem.querySelectorAll('span'));

    span.map( (a, i) => {  

        if(a.classList.contains("slider__step-active"))
           a.classList.remove("slider__step-active");   
          

         if (i == this.#value + 1)  
           a.classList.add("slider__step-active");
     })     


  }



  #initThumbSlider() {
    let percents = this.#value / (this.#steps) * 100;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');


    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
  }

  
}
