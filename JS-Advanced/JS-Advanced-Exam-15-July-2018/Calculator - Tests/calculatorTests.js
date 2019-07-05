let assert = require("chai").assert;
let Calculator = require('./Calculator');

describe('constructor', function () {
    it('Should init properly', function () {
        let current = new Calculator();
        assert.deepEqual([], current.expenses);
    });
});

describe('add', function () {
    it('Should add properly - from every type', function () {
        let current = new Calculator();
        current.add(5);
        current.add('5');
        current.add([5, 1, 6, 7]);
        current.add({ Atanas: 19 });
        assert.deepEqual([5,'5',[5,1,6,7],{ Atanas: 19 }], current.expenses);
    });
});


describe('divideNums', function () {
    it('Should return numbers from the array divided', function () {
        let current = new Calculator();
        current.add(10);
        current.add(10);
        current.add(10);
        current.add('5');
        current.add([5, 1, 6, 7]);
        current.add({ Atanas: 19 });

        assert.equal(0.1,current.divideNums())
    });

    it('Should return cannot divide by 0',function(){
        let current = new Calculator();
        current.add(0);
        current.add(0);
        current.add(0);
        current.add('5');
        current.add([5, 1, 6, 7]);
        current.add({ Atanas: 19 });

        assert.equal('Cannot divide by zero',current.divideNums())
    }); 

    it('Should throw error for no numbers in array',function(){
        let current = new Calculator();
        current.add('5');
        current.add([5, 1, 6, 7]);
        current.add({ Atanas: 19 });

        assert.throw(() => current.divideNums(),'There are no numbers in the array!')
    });
});

describe('toString',function(){
    it('Should return string with all element',function(){
        let current = new Calculator();
        current.add(10);
        current.add(10);
        current.add(10);
        current.add('5');
        current.add([5, 1, 6, 7]);
        current.add({ Atanas: 19 });

        assert.equal('10 -> 10 -> 10 -> 5 -> 5,1,6,7 -> [object Object]',current.toString());
    });

    it('Should return empty array',function(){
        let current = new Calculator();

        assert.equal('empty array',current.toString());
    }); 
});

describe('orderby',function(){
    it('Should sort everything by 2 criterias',function(){
        let current = new Calculator();
        current.add(25);
        current.add(1);
        current.add(566);
        current.add('5');
        current.add([5, 1, 6, 7]);
        current.add({ Atanas: 19 });

        assert.equal('1, 25, 5, 5,1,6,7, 566, [object Object]',current.orderBy());
    });

    it('Should return empty',function(){
        let current = new Calculator();

        assert.equal('empty',current.orderBy());
    });
});