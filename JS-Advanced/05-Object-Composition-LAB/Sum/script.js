function solve() {
    let firstNumber;
    let secondNumber;
    let resultNumber;

    return {
        init(selector1, selector2, resultSelector){
            firstNumber = selector1;
            secondNumber = selector2;
            resultNumber = resultSelector;
        },   
        add(){
            resultNumber.value = firstNumber.value + secondNumber.value;
        },
        subtract(){
            resultNumber.value = secondNumber.value - firstNumber.value;
        }
    }
}

solve();