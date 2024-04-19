/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {

  elem = "null";
  #rows = [];


  constructor(rows = this.#rows) {

    this.#rows = rows

    this.elem = this.#render();
  }
  


  #tamplate() {
  
return `
 <table>
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody>   
       
    ${
      this.#rows.map((obj) => `

     <td>${obj.name}</td>
     <td>${obj.age}</td>
     <td>${obj.salary}</td>
     <td>${obj.city}</td>                                                      

      <td><button>X</button></td>
      </tr>`).join('\n')                     
     }   
       
  </tbody>
</table>
`;
  }


  #render() {

    this.elem = document.createElement("div");
    this.elem.classList.add("example");

    this.elem.innerHTML = this.#tamplate();

    this.buttons = Array.from(this.elem.querySelectorAll('tr'));
  
    this.buttons.forEach(rows => { 
            rows.addEventListener('click', () => { 
            rows.remove();
    }, {once: true})
  })

    return this.elem;
  }
}
