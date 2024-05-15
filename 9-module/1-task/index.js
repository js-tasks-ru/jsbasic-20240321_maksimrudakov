export default function promiseClick(button) {
  
     const promise = new Promise((resolve) => {
      button.addEventListener('click', (event) => { 
        resolve(event)},
        {once: true});
    });
  
    return promise;
}
