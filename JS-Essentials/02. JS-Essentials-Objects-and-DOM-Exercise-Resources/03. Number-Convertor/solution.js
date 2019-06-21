function solve() {
    function clickEvent() {
        let selectMenuToValue = document.getElementById('selectMenuTo').value;
        let decimalElementValue = document.getElementById('input').value;
        
        let resultElement = document.getElementById('result');

        if (selectMenuToValue === 'binary') {
            resultElement.value = (+decimalElementValue).toString(2);
        }
        else if (selectMenuToValue === 'hexadecimal') {
            resultElement.value = (+decimalElementValue).toString(16).toUpperCase();
        }
    }

    let selectMenuToElement = document.getElementById('selectMenuTo');

    let newOption1Element = document.createElement('option');
    newOption1Element.text = 'Binary';
    newOption1Element.value = 'binary';

    let newOption2Element = document.createElement('option');
    newOption2Element.text = 'Hexadecimal';
    newOption2Element.value = 'hexadecimal';

    selectMenuToElement.appendChild(newOption1Element);
    selectMenuToElement.appendChild(newOption2Element);

    let convertItButton = document.getElementsByTagName('button');
    convertItButton[0].addEventListener('click', clickEvent);
}