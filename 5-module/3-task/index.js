function initCarousel() {
  
  const leftButton = document.querySelector('.carousel__arrow_left');
  const rightButton = document.querySelector('.carousel__arrow_right');

  const carousel = document.querySelector('.carousel__inner');
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
