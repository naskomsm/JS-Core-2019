function atmMachine(matrix){
    let totalCashInATM = [];

    function orderDescendingCash(numArray){
        numArray.sort((a, b) => b - a);
    }

    function Sum(numArray){
        const sum = numArray.reduce((partial_sum, a) => partial_sum + a,0); 
        return sum;
    }

    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    while (matrix.length > 0) {
        let current = matrix.shift(); // [20, 5, 100, 20, 1]
        
        if(current.length > 2){ // insert in ATM
            let insertedCash = 0;
            while (current.length > 0) {
                let banknote = current.shift();
                insertedCash += banknote;
                totalCashInATM.push(banknote);
            }

            orderDescendingCash(totalCashInATM);
            let currentBalance = Sum(totalCashInATM);
            console.log(`Service Report: ${insertedCash}$ inserted. Current balance: ${currentBalance}$.`);
        }
        else if(current.length === 2){ // withdraw
            let currentBalance = current.shift();
            let moneyToWithdraw = current.shift();

            if(currentBalance < moneyToWithdraw){
                console.log(`Not enough money in your account. Account balance: ${currentBalance}$.`);
                continue;
            }

            if(Sum(totalCashInATM) < moneyToWithdraw){
                console.log(`ATM machine is out of order!`);
                continue;
            }

            let cashWithdrawn = 0;
            for (let i = 0; i < totalCashInATM.length; i++) {
                if(totalCashInATM[i] + cashWithdrawn > moneyToWithdraw){
                    continue;
                }

                cashWithdrawn += totalCashInATM[i];
                totalCashInATM.splice(i,1);
                i--;
            }

            currentBalance -= cashWithdrawn;
            console.log(`You get ${cashWithdrawn}$. Account balance: ${currentBalance}$. Thank you!`);
        }
        else if(current.length === 1){ // report command
            let banknote = current.shift();
            let banknoteCount =  getOccurrence(totalCashInATM,banknote);
            console.log(`Service Report: Banknotes from ${banknote}$: ${banknoteCount}.`);
        }
    }
}

atmMachine([[20, 5, 100, 20, 1],
            [457, 25],
            [1],
            [10, 10, 5, 20, 50, 20, 10, 5, 2, 100, 20],
            [20, 85],
            [5000, 4500],
            ]           
   );