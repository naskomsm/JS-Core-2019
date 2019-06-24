class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = +budget;
        this.kids = {};
    };

    registerChild(name, grade, budget) {
        if(budget < this.budget){
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`
        }

        if (this.kids.hasOwnProperty(grade)) {
            for (const string of this.kids[grade]) {
                if(string === `${name}-${budget}`){
                    return `${name} is already in the list for this ${this.destination} vacation.`;
                }
            }

            this.kids[grade].push(`${name}-${budget}`);
        }

        else if(!this.kids.hasOwnProperty(grade)){
            this.kids[grade] = [];
            this.kids[grade].push(`${name}-${budget}`);
        }
        
        return this.kids[grade];
    };

    removeChild(name, grade) {
        if(this.kids.hasOwnProperty(grade)){
            for (const kid of this.kids[grade]) {
                let kidInfo = kid.split('-');
                let kidName = kidInfo[0];
                if(kidName === name){
                    let index = this.kids[grade].indexOf(kid);
                    this.kids[grade].splice(index,1);
                    return this.kids[grade];
                }
            }

            return `We couldn't find ${name} in ${grade} grade.`;
        }

        return `We couldn't find ${name} in ${grade} grade.`;
    }

    toString() {
        let result = `${this.organizer} will take ${this.numberOfChildren()} children on trip to ${this.destination}\n`;
        Object.entries(this.kids).sort((a, b) => b[0].localeCompare(a[0]));


        if(this.numberOfChildren() === 0){
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        let currentKidNumber = 1;
        for (const grade in this.kids) {
            result += `Grade: ${grade}\n`;
            currentKidNumber = 1;

            for (const kid in this.kids[grade]) {
                result += `${currentKidNumber}. ${this.kids[grade][kid]}\n`;
                currentKidNumber++;
            }
        }

        return result;
    };

    numberOfChildren() {
        return Object.keys(this.kids).length;
    };
}

let vacation = new Vacation('Miss. Elizabeth', 'The bahamas', 400);

console.log(vacation.registerChild('Gosho', 12, 3400));
console.log(vacation.registerChild('Pesho', 12, 400));
console.log(vacation.registerChild('Pesho', 12, 400));
console.log(vacation.registerChild('Skaro', 11, 400));
console.log(vacation.registerChild('Gosho', 11, 3444));
console.log(vacation.toString());
