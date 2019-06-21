function solution() {
    //microelements
    let microelements = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    };

    function restock(microelement, quantity) {
        microelements[microelement] += Number(quantity);
        return 'Success';
    }

    function prepare(recipe, quantity) {
        if (recipe === 'apple') { // ingredients for one product - 1carbohydrates,2flavour
            if (microelements.carbohydrate < 1 * quantity) {
                return `Error: not enough carbohydrate in stock`;
            }
            else if (microelements.flavour < 2 * quantity) {
                return `Error: not enough flavour in stock`;
            }
            else {
                microelements.carbohydrate -= 1 * quantity;
                microelements.flavour -= 2 * quantity;
                return `Success`;
            }
        }
        else if (recipe === 'lemonade') { // ingredients for one product - 10carbohydrates,20flavour
            if (microelements.carbohydrate < 10 * quantity) {
                return `Error: not enough carbohydrate in stock`;
            }
            else if (microelements.flavour < 20 * quantity) {
                return `Error: not enough flavour in stock`;
            }
            else {
                microelements.carbohydrate -= 10 * quantity;
                microelements.flavour -= 20 * quantity;
                return `Success`;
            }
        }
        else if (recipe === 'burger') { // ingredients for one product - 5carbohydrates,7fat,3flavour
            if (microelements.carbohydrate < 5 * quantity) {
                return `Error: not enough carbohydrate in stock`;
            }
            else if (microelements.fat < 7 * quantity) {
                return `Error: not enough fat in stock`;
            }
            else if (microelements.flavour < 3 * quantity) {
                return `Error: not enough flavour in stock`;
            }
            else {
                microelements.carbohydrate -= 5 * quantity;
                microelements.fat -= 7 * quantity
                microelements.flavour -= 3 * quantity;
                return `Success`;
            }
        }
        else if (recipe === 'eggs') { // ingredients for one product - 5protein,1fat,1flavour
            if (microelements.protein < 5 * quantity) {
                return `Error: not enough protein in stock`;
            }
            else if (microelements.fat < 1 * quantity) {
                return `Error: not enough fat in stock`;
            }
            else if (microelements.flavour < 1 * quantity) {
                return `Error: not enough flavour in stock`;
            }
            else {
                microelements.protein -= 5 * quantity;
                microelements.fat -= 1 * quantity;
                microelements.flavour -= 1 * quantity
                return `Success`;
            }
        }
        else if (recipe === 'turkey') { // ingredients for one product - 10protein,10carbohydrates,10fat,10flavour
            if (microelements.protein < 10 * quantity) {
                return `Error: not enough protein in stock`;
            }
            else if (microelements.carbohydrate < 10 * quantity) {
                return `Error: not enough carbohydrate in stock`;
            }
            else if (microelements.fat < 10 * quantity) {
                return `Error: not enough fat in stock`;
            }
            else if (microelements.flavour < 10 * quantity) {
                return `Error: not enough flavour in stock`;
            }
            else {
                microelements.protein -= 10 * quantity;
                microelements.carbohydrate -= 10 * quantity;
                microelements.fat -= 10 * quantity;
                microelements.flavour -= 10 * quantity
                return `Success`;
            }
        }
    }

    function report() {
        return `protein=${microelements.protein} carbohydrate=${microelements.carbohydrate} fat=${microelements.fat} flavour=${microelements.flavour}`;
    }

    // get the input
    return function (input) {
        const tokens = input.split(' ');
        const command = tokens[0];

        switch (command) {
            case "prepare":
                return prepare(tokens[1], +tokens[2]);
            case "restock":
                return restock(tokens[1], +tokens[2]);
            case "report":
                return report();
        }
    }
}

let manager = solution();
console.log(manager("prepare turkey 1")); 
console.log(manager("restock protein 10")); 
console.log(manager("prepare turkey 1")); 
console.log(manager("restock carbohydrate 10")); 
console.log(manager("prepare turkey 1")); 
console.log(manager("restock fat 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("report"));


