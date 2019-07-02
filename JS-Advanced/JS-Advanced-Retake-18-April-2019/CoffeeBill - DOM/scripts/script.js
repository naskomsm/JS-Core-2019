function addProduct() {
    let text = document.getElementsByTagName('input')[0];
    let number = document.getElementsByTagName('input')[1];

    if (text.value !== '' && number.value !== '') {
        let tableBody = document.getElementById('product-list');
        
        updateTotalPrice();

        let product = makeProduct();
        tableBody.appendChild(product);

        text.value = '';
        number.value = '';
    }

    function updateTotalPrice(){
        let tableTotalInfo = document.getElementsByTagName('tfoot')[0].children[0];
        let currentPrice = +tableTotalInfo.children[1].innerHTML;
        let newPrice = currentPrice + +number.value;
        tableTotalInfo.children[1].innerHTML = newPrice;
    }

    function makeProduct(){
        let newRow = document.createElement('tr');
        let textTd = document.createElement('td');
        let numberTd = document.createElement('td');
        textTd.innerHTML = text.value;
        let price = +number.value;
        numberTd.innerHTML = price

        newRow.appendChild(textTd);
        newRow.appendChild(numberTd)

        return newRow;
    }
}