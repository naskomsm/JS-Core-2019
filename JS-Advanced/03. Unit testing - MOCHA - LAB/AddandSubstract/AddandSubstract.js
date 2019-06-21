function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}

let calculator = createCalculator();
calculator.add(5);
calculator.add(5);
calculator.subtract(2);
console.log(calculator.get());

module.exports = createCalculator;