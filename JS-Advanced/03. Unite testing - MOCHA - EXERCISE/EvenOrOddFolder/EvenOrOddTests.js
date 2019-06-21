let assert = require("chai").assert;
let isOddOrEven = require('./EvenOrOdd');

describe('Proper return values',function (){
    it('Should return even with proper input',function(){
        let current = isOddOrEven('naso');
        assert.equal('even',current);
    });

    it('Should return odd with proper input',function(){
        let current = isOddOrEven('nasoo');
        assert.equal('odd',current);
    });
});

describe('Wrong return values',function (){
    it('Should return undefined',function(){
        let current = isOddOrEven(7);
        assert.equal(undefined,current);
    });

    it('Should return undefined',function(){
        let current = isOddOrEven({name: "Atanas"});
        assert.equal(undefined,current);
    });
});