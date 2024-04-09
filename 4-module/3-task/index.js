function highlight(table) {

  for (let i = 1; i < table.rows.length; i++) {

    let tr = table.rows[i];

   (tr.cells[3].dataset.available == 'true')  ? tr.classList.add('available') :
   (tr.cells[3].dataset.available == 'false') ? tr.classList.add('unavailable') : 
                                                 tr.setAttribute('hidden', true); 
  

   (tr.cells[2].textContent == "m") ? tr.classList.add('male') :
                                      tr.classList.add('female');


    if (parseInt(tr.cells[1].textContent) < 18) 
      tr.style = "text-decoration: line-through";
  }
}
