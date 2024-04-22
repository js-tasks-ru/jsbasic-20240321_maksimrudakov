function toggleText() {
  
  const button = document.querySelector('.toggle-text-button');

  
  button.addEventListener('click', () => {

    const text = document.querySelector('[id="text"]');

    text.hidden = !text.hidden;
  })
}
