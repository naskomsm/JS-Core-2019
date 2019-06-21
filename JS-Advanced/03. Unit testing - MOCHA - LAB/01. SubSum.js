function solve(array,startIndex,endIndex){
    if(startIndex < 0){
        startIndex = 0;
    }
    if(endIndex > array.length - 1){
        endIndex = array.length - 1;
    }

    let sum = 0;
    for (let i = startIndex; i <= endIndex; i++) {
        sum += array[i];
    }

    return Math.round(sum * 100) / 100;
}

console.log(solve('text', 0, 2));