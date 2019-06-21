function create(words) {
   words.forEach((string) => {
      let newDiv = document.createElement('div');
      let newParagraph = document.createElement('p');
      newParagraph.textContent = string;
      newParagraph.style.display = 'none';
      newDiv.appendChild(newParagraph);
      newDiv.addEventListener('click',onclick);
      document.getElementById('content').appendChild(newDiv);
   });


   function onclick(){
      this.children[0].style.display = 'block';
   }
}