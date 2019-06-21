function addItem() {
    let newText = document.getElementById('newText').value;
    let itemList = document.getElementById('items');

    let newLiElement = document.createElement('li');
    newLiElement.innerHTML = newText;

    let newAElement = document.createElement('a');
    newAElement.setAttribute('href','#');
    newAElement.innerHTML = '[Delete]'
    newLiElement.appendChild(newAElement);
    itemList.appendChild(newLiElement);

    newAElement.addEventListener('click',deleteItem);
    function deleteItem(){
        itemList.removeChild(this.parentNode);
    }
}