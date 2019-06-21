function nonDecreasingSub(array){
    let currentNum = 0;
    result = [];
    while(array.length > 0){
        let arrayCurrentNum = array.shift();
        if(arrayCurrentNum >= currentNum){
            result.push(arrayCurrentNum);
            currentNum = arrayCurrentNum;
        }
    }

    console.log(result.join('\n'));
}

nonDecreasingSub([1, 
    3, 
    8, 
    4, 
    10, 
    12, 
    3, 
    2, 
    24]
    );