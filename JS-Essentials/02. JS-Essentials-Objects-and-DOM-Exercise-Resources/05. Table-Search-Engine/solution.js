function solve() {
   function clickEvent() {
      //clearing all select elements before anything
      let selectedRows = document.getElementsByClassName('select');
      Array.from(selectedRows).map(x => x.classList.remove('select'));

      let searchInputValue = document.getElementById('searchField').value.toLowerCase();
      document.getElementById('searchField').value = '';

      // matrix
      let tableRowsElements = Array.from(document.querySelector("table tbody").children);
      for (let row of tableRowsElements) {
         let cells = Array.from(row.children);

         for (let cell of cells) {
            if (cell.textContent.toLowerCase().includes(searchInputValue)) {
               row.classList.add('select');
            }
         }
      }
   }

   let buttonElement = document.getElementById('searchBtn');
   buttonElement.addEventListener('click', clickEvent);
}
