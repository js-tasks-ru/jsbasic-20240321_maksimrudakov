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


    this.elem.addEventListener('click', (e) => {

      let {x}= this.elem.getBoundingClientRect();
      let widthSlider = this.elem.offsetWidth;
      let posCursor = e.clientX - x;

      this.#value = Math.round((posCursor / widthSlider) * (this.#steps));
    
      this.#initValue();
      this.#selectStep();
      this.#initThumbSlider();


      this.elem.dispatchEvent(new CustomEvent("slider-change", {
        detail: this.#value, 
       bubbles: true,
      }))
    })
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
