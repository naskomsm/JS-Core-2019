function addRemoveElements(array){
    let result = [];

    let initial = 0;

    while(array.length > 0){
        initial++;
        let command = array.shift();
        if(command === 'add'){
            result.push(initial);
        }
        else{
            result.pop(initial);
        }
    }

    if(result.length > 0){
        console.log(result.join('\n'));
    }
    else{
        console.log('Empty');
    }

}

addRemoveElements(['remove', 
'remove', 
'remove']
);