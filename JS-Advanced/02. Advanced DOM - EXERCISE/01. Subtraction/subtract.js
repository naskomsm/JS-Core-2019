function subtract() {
    let firstNumber = document.getElementById('firstNumber').value;
    let secondNumber = document.getElementById('secondNumber').value;
    
    const subtract = (firstNumber,secondNumber) => {
        return firstNumber - secondNumber;
    };

    let result = subtract(firstNumber,secondNumber);
    const appendInDom = (result) => {
        document.getElementById('result').textContent = result;
    };

    appendInDom(result);
}