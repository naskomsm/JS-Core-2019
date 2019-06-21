function solve(array){
    let sum = array.reduce((acc,curr) => acc + curr);
    let min = array.reduce((acc,curr) => Math.min(acc,curr));
    let max = array.reduce((acc,curr) => Math.max(acc,curr));
    let product = array.reduce((acc,curr) => acc * curr,1);
    let join = array.reduce((acc,curr) => '' + acc + curr);

    console.log(`Sum = ${sum}`);
    console.log(`Min = ${min}`);
    console.log(`Max = ${max}`);
    console.log(`Product = ${product}`);
    console.log(`Join = ${join}`);
}

solve([5, -3, 20, 7, 0.5]);