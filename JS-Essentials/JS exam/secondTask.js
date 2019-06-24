function solve(capacity, array) {
    let train = [];

    let passengersLeft = array.reduce((a, b) => a + b);
    let previousPassengers = 0;

    for (let i = 0; i < array.length; i++) {
        let current = array[i] + previousPassengers;

        if(current <= capacity){
            train[i] = current;
            passengersLeft -= current;
            previousPassengers = 0;
        }      
        else{
            current -= capacity;
            previousPassengers = current;
            train[i] = capacity;
            passengersLeft -= capacity;
        }  
    }

    console.log(train);

    if(passengersLeft > 0){
        console.log(`Could not fit ${passengersLeft} passengers`);
    }else if(passengersLeft === 0) {
        console.log(`All passengers aboard`);
    }
}
