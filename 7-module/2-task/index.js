import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  #elem = 'null';

  constructor() {

    this.#elem = this.#render();

    this.clickClose();

    this.keyboardClose();
  }


  #render() {

    return createElement (`
    
    <div class="modal">
 
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
       
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
        </h3>
      </div>

      <div class="modal__body">
      </div>
    </div>

  </div>

    `)

  }



  open() {

    document.body.append(this.#elem);
    document.body.classList.add("is-modal-open");
  }



  setTitle(text) {
    
    const title = this.#elem.querySelector('.modal__title')

    title.textContent = text;
  }



  setBody(text) {

    const modalBody = this.#elem.querySelector('.modal__body')

    modalBody.innerHTML= text.outerHTML;
  }



  close() {

    document.body.classList.remove("is-modal-open");
    document.body.innerHTML = "";
  }



  clickClose() {

    const buttonX = this.#elem.querySelector('.modal__close');

    buttonX.addEventListener('click', () => {

      this.close();
    })
  }



  keyboardClose() {

    document.addEventListener('keydown', (event) => {

      if (event.code == 'Escape')
      this.close();
    })

  }
}
