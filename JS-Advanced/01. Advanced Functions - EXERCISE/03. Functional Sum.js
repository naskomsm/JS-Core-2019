function add(number) {
    let sum = number;

    function addNextNum(nextNumber) {
        sum += nextNumber;
        return addNextNum;
    };

    addNextNum.toString = function () {
        return sum;
    };

    return addNextNum;
}

console.log(Number(add(1)(6)(-3)));