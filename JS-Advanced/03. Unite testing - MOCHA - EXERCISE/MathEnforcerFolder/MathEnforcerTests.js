let assert = require("chai").assert;
let mathEnforcer = require('./MathEnforcer');

describe('addFive tests',function(){
    it('Should return proper value',function(){
        let current = mathEnforcer.addFive(5);
        assert.equal(10,current);
    });

    it('Should return proper value',function(){
        let current = mathEnforcer.addFive(3.5);
        assert.closeTo(8.5,current,0.01);
    });


    it('Should return proper value',function(){
        let current = mathEnforcer.addFive(-5);
        assert.equal(0,current);
    });

    it('Should return undefined becouse of parameter which is not a number',function(){
        let current = mathEnforcer.addFive('Hello');
        assert.equal(undefined,current);
    });
});

describe('subtractTen tests',function(){
    it('Should return proper value',function(){
        let current = mathEnforcer.subtractTen(20);
        assert.equal(10,current);
    });

    it('Should return proper value',function(){
        let current = mathEnforcer.subtractTen(20.5);
        assert.closeTo(10.5,current,0.01);
    });

    it('Should return proper value',function(){
        let current = mathEnforcer.subtractTen(-20);
        assert.equal(-30,current);
    });

    it('Should return undefined becouse of parameter which is not a number',function(){
        let current = mathEnforcer.subtractTen('Hello');
        assert.equal(undefined,current);
    });
});

describe('sum tests',function(){
    it('Should return proper value',function(){
        let current = mathEnforcer.sum(5,5);
        assert.equal(10,current);
    }); 

    it('Should return proper value',function(){
        let current = mathEnforcer.sum(5.5,10.2);
        assert.closeTo(15.7,current,0.01);
    }); 

    it('Should return proper value',function(){
        let current = mathEnforcer.sum(-20,-20);
        assert.equal(-40,current);
    }); 

    it('Should return undefined becouse of first parameter which is not a number',function(){
        let current = mathEnforcer.sum('hello',2)
        assert.equal(undefined,current);
    });

    it('Should return undefined becouse of second parameter which is not a number',function(){
        let current = mathEnforcer.sum(2,'hello')
        assert.equal(undefined,current);
    });
});
