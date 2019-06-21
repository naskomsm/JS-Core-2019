function solve(array){
    return array.reduce((acc,curr) => Math.max(acc,curr));
}

console.log(solve([10, 20, 5]));