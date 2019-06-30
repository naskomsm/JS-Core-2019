class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = +budget;
        this.kids = {};
    };

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        if (!this.kids.hasOwnProperty(grade)) {
            this.kids[grade] = [];
        }

        if (this.kids[grade].includes(`${name}-${budget}`)) {
            return `${name} is already in the list for this ${this.destination} vacation.`
        }

        this.kids[grade].push(`${name}-${budget}`)
        return this.kids[grade];
    }

    removeChild(name,grade){
        for (const kid of this.kids[grade]) { // kid => name-budget
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

    toString(){
        if(this.numberOfChildren === 0){
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        Object.entries(this.kids).sort((a, b) => b[0].localeCompare(a[0]));
        let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;

        let currentKidNumber = 1;
        for (const grade in this.kids) {
            result += `Grade: ${grade}\n`;
            currentKidNumber = 1;
            
            for (const kid in this.kids[grade]) {
               result += `${currentKidNumber++}. ${this.kids[grade][kid]}\n`;
            }
        }

        return result;
    }

    get numberOfChildren(){
        let count = 0;

        for (const grade in this.kids) {
            count += this.kids[grade].length;
        }

        return count;
    }
}