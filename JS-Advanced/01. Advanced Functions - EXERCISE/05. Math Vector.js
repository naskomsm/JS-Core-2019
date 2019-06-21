const solution = (function () {
    function add(array, secondArray) {
        let firstArraySum = array[0] + secondArray[0];
        let secondArraySum = array[1] + secondArray[1];

        return [firstArraySum, secondArraySum];
    }

    function multiply(array, multiplier) {
        let firstNumber = array[0] * multiplier;
        let secondNumber = array[1] * multiplier;

        return [firstNumber, secondNumber];
    }

    function length(array) {
        let fistNumberSqrt = array[0] * array[0];
        let secondNumberSqrt = array[1] * array[1];

        return Math.sqrt(fistNumberSqrt + secondNumberSqrt);
    }

    function dot(array, secondArray) {
        let firstArraySum = array[0] * secondArray[0];
        let secondArraySum = array[1] * secondArray[1];

        return firstArraySum + secondArraySum;
    }

    function cross(array, secondArray) {
        let firstArraySum = array[0] * secondArray[1];
        let secondArraySum =  array[1] * secondArray[0];

        return firstArraySum - secondArraySum;
    }

    return {
        add,
        multiply,
        length,
        dot,
        cross
    }
})();

console.log(solution.dot([2, 3], [2, -1]));