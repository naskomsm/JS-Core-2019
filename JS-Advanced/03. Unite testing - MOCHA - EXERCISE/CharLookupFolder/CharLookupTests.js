let assert = require("chai").assert;
let lookupChar = require('./CharLookup');

describe('Proper return value',function(){
    it('Should return proper char',function(){
        let current = lookupChar('naso',2);
        assert.equal('s',current);
    }); 

    it('Should return proper char',function(){
        let current = lookupChar('naso',1);
        assert.equal('a',current);
    }); 

    it('Should return proper char',function(){
        let current = lookupChar('naso',0);
        assert.equal('n',current);
    }); 
});

describe('Wrong return value',function(){
    it('Should return undefined becouse of wrong string',function(){
        let current = lookupChar(5,1);
        assert.equal(undefined,current);
    });

    it('Should return undefined becouse of wrong index',function(){
        let current = lookupChar('naso','wrong');
        assert.equal(undefined,current);
    });

    it('Should return undefined becouse of wrong index',function(){
        let current = lookupChar('naso',2.15);
        assert.equal(undefined,current);
    });

    it('Should return undefined becouse of bigger index',function(){
        let current = lookupChar('naso',150);
        assert.equal('Incorrect index',current);
    });

    it('Should return undefined becouse negative index',function(){
        let current = lookupChar('naso',-5);
        assert.equal('Incorrect index',current);
    });

    it('Should return undefined becouse equal index',function(){
        let current = lookupChar('naso',4);
        assert.equal('Incorrect index',current);
    });
});
