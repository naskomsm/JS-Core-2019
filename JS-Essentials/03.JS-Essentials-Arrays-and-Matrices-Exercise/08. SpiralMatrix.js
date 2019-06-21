function solve(x,y){
    let matrix = new Array(x);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(y);
    }

    let startNumber = 1;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            matrix[row][col] = startNumber++;

            if(col === y-1){

            }
            //to do
        }
    }

}

solve(3,3);