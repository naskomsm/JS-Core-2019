function solve(array, number) {
    let firstPartArray = array.slice(0, array.length / 2);
    let secondPartArray = array.slice(array.length / 2);

    let firstPart = [];
    let secondPart = [];

    for (let i = 0; i < array.length / 2; i += number) {
        firstPart.push(firstPartArray.splice(0, number));
        secondPart.push(secondPartArray.splice(0, number));
    };

    let firstGiant = [];
    let secondGiant = [];

    for (let i = 0; i < firstPart.length; i++) {
        firstGiant.push(firstPart[i].reduce((a, b) => a * b));
        secondGiant.push(secondPart[i].reduce((a, b) => a * b));
    };

    firstGiant = firstGiant.reduce((a, b) => a + b);
    secondGiant = secondGiant.reduce((a, b) => a + b);

    const damagePerHit = Math.min(...array);
    const max = Math.max(...array);

    let rounds = 1;
    while (firstGiant > max && secondGiant > max && damagePerHit > 0) {
        firstGiant -= damagePerHit;
        secondGiant -= damagePerHit;
        rounds++;
    };

    if (firstGiant > secondGiant) {
        console.log(`First Giant defeated Second Giant with result ${firstGiant} - ${secondGiant} in ${rounds} rounds`);
    }
    else if (secondGiant > firstGiant) {
        console.log(`Second Giant defeated First Giant with result ${secondGiant} - ${firstGiant} in ${rounds} rounds`);
    }
    else {
        console.log(`Its a draw ${firstGiant} - ${secondGiant}`);
    };
}


solve([3, 3, 3, 4, 5, 6, 7, 8, 9, 10, 5, 4], 2);