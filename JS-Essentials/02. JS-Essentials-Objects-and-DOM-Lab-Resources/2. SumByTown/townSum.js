function sum(input){
    let result = {};

    for (let i = 0; i < input.length; i+=2) {
        if(!result[input[i]]){
            result[input[i]] = 0;
        }
            result[input[i]] += Number(input[i+1]);
    }

    console.log(JSON.stringify(result));
}

sum(["Sofia",
    "20",
    "Varna",
    "3",
    "Sofia",
    "5",
    "Varna",
    "4",
]);