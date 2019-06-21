function diagonalAttack(arrayOfStrings) {
    let numberMatrix = arrayOfStrings.map((element) => {
        return element.split(' ');
    });

    for (let i = 0; i < numberMatrix.length; i++) {
        numberMatrix[i] = numberMatrix[i].map(Number);
    }

    let sumFirstDiagonal = 0;
    let sumSecondDiagonal = 0;

    //wtf is going on :D dont know how i fucking did this
    for (let row = 0; row < numberMatrix.length; row++) {
        numberMatrix[i][i];
        numberMatrix[i][numberMatrix.length - i - 1];

        for (let col = 0; index < array.length; index++) {
            
        }
    }

    if (sumFirstDiagonal === sumSecondDiagonal) {
        for (let i = 0; i < numberMatrix.length; i++) {

        }
    } else {
        numberMatrix.forEach(x => console.log(x.join(' ')));
    }
}

diagonalAttack(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']
);