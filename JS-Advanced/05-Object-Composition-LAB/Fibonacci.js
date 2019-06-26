function getFibonator (){
    let sum = 0;
    let current = 0;
    let next  = 1;

    return function (){
        sum = current + next;
        current = next;
        next = sum;
        return current;
    }
};

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
