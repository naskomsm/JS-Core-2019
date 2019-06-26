class Rat{
    constructor(name){
        this.name = name;
        this.unitedRats = [];
    }

    unite(otherRat){
        if(otherRat instanceof Rat){
            this.unitedRats.push(otherRat);
        }
    }

    getRats() {
        return this.unitedRats;
    }

    toString(){
        let result = `${this.name}\n`;
        if(this.unitedRats.length > 0){
            this.unitedRats.forEach(function (rat){
                result += `##${rat}`;
            });    
        }
        
        return result;
    }
}

let firstRat = new Rat("Peter");
let secondRat = new Rat('Gosho');
firstRat.unite(secondRat);
console.log(firstRat.toString());

