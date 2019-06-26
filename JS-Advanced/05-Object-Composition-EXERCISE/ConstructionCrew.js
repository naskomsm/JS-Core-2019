function solve(worker){
    if(worker.dizziness === false){
        return worker;
    }

    let amountToAdd = 0.1 * worker.weight * worker.experience;
    worker.levelOfHydrated += amountToAdd;
    worker.dizziness = false;

    return worker;
}