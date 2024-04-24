import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {

  elem = 'null';

  #steps = null;
  #value = null;

  constructor({ steps, value = 0}) {

    this.#value = value;

    this.#steps = steps - 1;

    this.elem = this.#render();

    this.#initSliderSteps();

    this.#initValue();

    this.#selectStep();

    this.#initThumbSlider();

    this.#clickSlider();

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



  #initSliderSteps() {

    
    let sliderSteps = this.elem.querySelector('.slider__steps');

    for (let i = 0; i <= this.#steps; i++)
        sliderSteps.innerHTML += `<span></span>\n`;

  }




  #clickSlider() {
    
    const thumb = this.elem.querySelector('.slider__thumb'); 
    thumb.addEventListener('pointerdown', this.#onDown);   
  }
  
  #onDown = (event) => {

    event.ondragstart = (e) => e.preventDefault();

    this.elem.classList.add("slider_dragging"); // добавим класс
    
    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp);
    
    this.positionSlider = this.elem.getBoundingClientRect().left; // позиция левого края слайдера
    this.widthSlider = this.elem.offsetWidth; // ширина слайдера 
  };
  



  #onMove = (event) => {

    this.#initDinamicValues(event);
  };


  
  #onUp = (event) => {
    
     document.removeEventListener('pointermove', this.#onMove);

     this.#initDinamicValues(event);


      this.elem.dispatchEvent(new CustomEvent("slider-change", {
             detail: this.#value, 
             bubbles: true,
      }))

    
      this.elem.classList.remove("slider_dragging"); // удалим класс
    
      document.removeEventListener('pointerup', this.#onUp); 
  };


  #initDinamicValues = (event) => {

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    let shiftX = event.clientX - this.positionSlider; // позиция курсора относительно слайдера

    this.#value = Math.round((shiftX / this.widthSlider) * (this.#steps)); // вычисленное целое значение положения ползунка
  

    const coef = shiftX / this.widthSlider; // коэффициент ползунка

    let percents = null;


    if(coef < 0) {
      percents = 0;  this.#value = 0;
    }
    else if (coef > 1) {
      percents = 100;  this.#value = this.#steps
    }
    else if(event.type == "pointermove")
      percents = shiftX * 100 / this.widthSlider; // вычисленный процент относительно курсора   
    else 
      percents = this.#value / (this.#steps) * 100; // вычесленный процент от целого числа ближайщей позиции
          

    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
    this.#initValue(); 
    this.#selectStep();
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

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');


    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
  }






}
