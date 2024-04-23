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

    // this.#initValue();

    // this.#selectStep();

    // this.#initThumbSlider();

    this.clickSlider();
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


  // this.elem.classList.remove("slider_dragging");

  clickSlider = () => {

    // let slider = this.element.querySelector('.slider__thumb');

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');



    thumb.addEventListener('pointerdown', (e) => {


      this.elem.classList.add("slider_dragging"); // добавим класс


      const positionSlider = this.elem.getBoundingClientRect().left; // позиция левого края слайдера
      const widthSlider = this.elem.offsetWidth; // ширина слайдера

      let shiftX = e.clientX - positionSlider; // позиция курсора относительно слайдера
      this.#value = Math.round((shiftX / widthSlider) * (this.#steps));




      document.addEventListener('pointermove', moveAt);
    
      


      function moveAt(e) {

        let shiftX = e.clientX - positionSlider; // позиция курсора относительно слайдера

        this.#value = Math.round((shiftX / widthSlider) * (this.#steps)); // вычисленное целое значение положения ползунка
        this.elem.querySelector('.slider__value').textContent = this.#value; // запись значения в элемент

        
        let percents = shiftX * 100 / widthSlider; // вычисленный процент относительно курсора
    
        thumb.style.left = `${percents}%`;
        progress.style.width = `${percents}%`;
      }


      

      function upAt(e) {

        let shiftX = e.clientX - positionSlider; // позиция курсора относительно слайдера

        this.#value = Math.round((shiftX / widthSlider) * (this.#steps)); // вычисленное целое значение положения ползунка
        this.elem.querySelector('.slider__value').textContent = this.#value; // запись значения в элемент

        
        let percents = this.#value / (this.#steps) * 100; // вычесленный процент от целого числа ближайщей позиции
    
        thumb.style.left = `${percents}%`;
        progress.style.width = `${percents}%`;

        this.#selectStep();


        document.removeEventListener('pointermove', moveAt);

        this.elem.classList.remove("slider_dragging");

        this.elem.removeEventListener('pointerup', upAt);
      }




      this.elem.addEventListener('pointerup', upAt);


      this.elem.ondragstart = (e) => e.preventDefault();


    });
  }


//  #moveAt = (event) => {

//         let shiftX = event.clientX - positionSlider; // позиция курсора относительно слайдера

//         this.#value = Math.round((shiftX / widthSlider) * (this.#steps)); // вычисленное целое значение положения ползунка
//         this.elem.querySelector('.slider__value').textContent = this.#value; // запись значения в элемент

        
//         let percents = shiftX * 100 / widthSlider; // вычисленный процент относительно курсора
    
//         thumb.style.left = `${percents}%`;
//         progress.style.width = `${percents}%`;
//       }




//        #upAt = (event) => {

//         let shiftX = event.clientX - positionSlider; // позиция курсора относительно слайдера

//         this.#value = Math.round((shiftX / widthSlider) * (this.#steps)); // вычисленное целое значение положения ползунка
//         this.elem.querySelector('.slider__value').textContent = this.#value; // запись значения в элемент

        
//         let percents = this.#value / (this.#steps) * 100; // вычесленный процент от целого числа ближайщей позиции
    
//         thumb.style.left = `${percents}%`;
//         progress.style.width = `${percents}%`;

//         this.#selectStep();


//          document.removeEventListener('pointermove', this.#moveAt);

//          this.elem.classList.remove("slider_dragging");

//          this.elem.removeEventListener('pointerup', this.#upAt);
//       }





  // #onDown = () => {
    
  //   this.elem.addEventListener('pointermove', (e) => {

      

  //     let {x}= this.elem.getBoundingClientRect();
  //     let widthSlider = this.elem.offsetWidth;
  //     let posCursor = e.clientX - x;
  
  //     this.#value = Math.round((posCursor / widthSlider) * (this.#steps));
    
  //     this.#initValue();
  //     this.#selectStep();
  //     this.#initThumbSlider();
  
  
  //     this.elem.dispatchEvent(new CustomEvent("slider-change", {
  //       detail: this.#value, 
  //      bubbles: true,
  //     }))

  //   } );

  //   this.elem.addEventListener('pointerup', this.#onUp());

   
  // }


  // #initValue() {

  //   this.elem.querySelector('.slider__value').textContent = this.#value;
  // }



  #selectStep() {

    let span = Array.from(this.elem.querySelectorAll('span'));

    span.map( (a, i) => {  

        if(a.classList.contains("slider__step-active"))
           a.classList.remove("slider__step-active");   
          

         if (i == this.#value + 1)  
           a.classList.add("slider__step-active");
     })     


  }



  // #initThumbSlider() {

  //   let percents = this.#value / (this.#steps) * 100;

  //   let thumb = this.elem.querySelector('.slider__thumb');
  //   let progress = this.elem.querySelector('.slider__progress');


  //   thumb.style.left = `${percents}%`;
  //   progress.style.width = `${percents}%`;
  // }

  
}

