function addItem() {
    let newText = document.getElementById('newItemText').value;
    let itemList = document.getElementById('items');

    let newTextElement = document.createElement('li');
    newTextElement.innerHTML = newText;

    itemList.appendChild(newTextElement);
}