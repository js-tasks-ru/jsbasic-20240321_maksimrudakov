function initCarousel() {
  
  const leftButton = document.querySelector('.carousel__arrow_left');
  const rightButton = document.querySelector('.carousel__arrow_right');

  const carousel = document.querySelector('.carousel__inner');
  const step = carousel.offsetWidth;
  let currentStep = 0;

  const countPictures = (carousel.querySelectorAll('.carousel__slide')).length;//

  

  function check_Picture_Left_Side() {
  
    return (currentStep == 0)? true : false;
  }
  
  
  function check_Picture_Right_Side() {
    
    return (currentStep == -step * (countPictures-1))? true : false;
  }



  if (check_Picture_Left_Side()) {
        leftButton.style.display = 'none';
  }
  else if (check_Picture_Right_Side()) 
        rightButton.style.display = 'none';
  
  
////////////////////////////////////////////////////////////////////

 rightButton.addEventListener('click', () => {                    

   if (check_Picture_Left_Side()) 
   leftButton.style.display = '';


    currentStep -= step;
    carousel.style.transform = `translateX(${currentStep}px)`;


    if (check_Picture_Right_Side()) 
   rightButton.style.display = 'none';
  })

////////////////////////////////////////////////////////////////////

  leftButton.addEventListener('click', () => {

    if (check_Picture_Right_Side()) 
    rightButton.style.display = '';


    currentStep += step;
    carousel.style.transform = `translateX(${currentStep}px)`;


    if (check_Picture_Left_Side()) 
    leftButton.style.display = 'none';
  })

///////////////////////////////////////////////////////////////////
}
