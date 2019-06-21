class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    };

    registerChild(name, grade, budget) {
        if (!this.kids.hasOwnProperty(grade)) {
            this.kids[grade] = [];
        }

        let currentKid = { name: name, budget: budget };
        if (currentKid.budget < this.budget) {
            return `${currentKid.name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        if (this.kids[grade].some(kid => kid.name === currentKid.name)) {
            return `${currentKid.name} is already in the list for this ${this.destination} vacation.`
        }

        this.kids[grade].push(currentKid);
        //print the current grade
        let currentGrade = [];
        this.kids[grade].forEach((kid) => {
            let stringToPush = `${kid.name}-${kid.budget}`;
            currentGrade.push(stringToPush);
        });

        return currentGrade;
    };

    removeChild(name, grade) {
        if (this.kids.hasOwnProperty(grade)) {
            if (this.kids[grade].some(kid => kid.name === name)) {
                let kidToRemove = this.kids[grade].find(kid => kid.name === name);
                let index = this.kids[grade].indexOf(kidToRemove);
                this.kids[grade].splice(index, 1);

                let currentGrade = [];
                this.kids[grade].forEach((kid) => {
                    let stringToPush = `${kid.name}-${kid.budget}`;
                    currentGrade.push(stringToPush);
                });

                return currentGrade;
            }
            else {
                return `We couldn't find ${name} in ${grade} grade.`;
            }
        }
        else {
            return `We couldn't find ${name} in ${grade} grade.`;
        }
    }

    toString() {
        if(Object.entries(this.kids).length > 0){
            const unorderedKids = this.kids;
            const orderedKids = {};
            Object.keys(unorderedKids).sort().forEach(function (key) {
                orderedKids[key] = unorderedKids[key];
            });
    
            const filteredAndOrderedKids = Object.keys(orderedKids).filter(key => unorderedKids[key].length > 0).reduce((obj, key) => {
                obj[key] = unorderedKids[key];
                return obj;
            }, {});
    
            let numberOfChildren = 0;
            for (const key in filteredAndOrderedKids) {
                numberOfChildren += filteredAndOrderedKids[key].length;
            }
            
            let result = '';
            result += `${this.organizer} will take ${numberOfChildren} children on trip to ${this.destination}\n`;
    
            for (const key in filteredAndOrderedKids) {
                result += `Grade: ${key}\n`;
    
                let index = 1;
                for (const kid in filteredAndOrderedKids[key]) {
                   result += `${index++}. ${filteredAndOrderedKids[key][kid].name}-${filteredAndOrderedKids[key][kid].budget}\n`;
                }
            }
    
            return result;
        }
        else{
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }
    };

    numberOfChildren(){
        let numberOfChildren = 0;
        for (const key in filteredAndOrderedKids) {
            numberOfChildren += filteredAndOrderedKids[key].length;
        }

        return numberOfChildren;
    };
}

let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);
console.log(vacation.toString());
