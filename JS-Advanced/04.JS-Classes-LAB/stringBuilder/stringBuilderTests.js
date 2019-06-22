let assert = require("chai").assert;
let StringBuilder = require('./StringBuilder');

describe('constructor should work properly', function () {
    it('Should initialize stringBuilder properly', function () {
        let current = new StringBuilder('hello');
        assert.equal('hello', current);
    });

    it('Shoult return array when its !== string', function () {
        let current = new StringBuilder(undefined);
        assert.equal(0, current.toString().length);
    });

    it('Shoult throw error when its !== string', function () {
        assert.throw(() => { new StringBuilder([]); }, 'Argument must be string');
    });
});

describe('append should work properly', function () {
    it('Should append properly', function () {
        let current = new StringBuilder('hello');
        current.append('Brat eto ti');
        assert.equal('helloBrat eto ti', current.toString());
    });

    it('Should throw error', function () {
        let current = new StringBuilder('hello');
        assert.throw(() => { current.append(undefined) }, 'Argument must be string');
    });
});

describe('Prepend should work properly', function () {
    it('Should prepend properly', function () {
        let current = new StringBuilder('4, minus 1 thats 3 quick maths');
        current.prepend('2 + 2 is = ');
        assert.equal('2 + 2 is = 4, minus 1 thats 3 quick maths', current.toString());
    });

    it('Should throw error', function () {
        let current = new StringBuilder('hello');
        assert.throw(() => { current.prepend(undefined) }, 'Argument must be string');
    });
});

describe('InsertAt should work properly', function () {
    it('Should throw error', function () {
        let current = new StringBuilder('hello');
        assert.throw(() => { current.insertAt(undefined) }, 'Argument must be string');
    });

    it('Should insertAt proper index', function () {
        let current = new StringBuilder('hello');
        current.append(', there');
        current.prepend('User, ');
        current.insertAt('woop', 5);
        assert.equal('User,woop hello, there', current);
    });
});

describe('Remove should work properly', function () {
    it('Should remove proper index', function () {
        let current = new StringBuilder('');
        assert.equal('',current.toString())
    });
});

describe('toString and _vrfyParam should work',function(){
    it('Should work dude',function(){
        it('Should throw error', function () {
            let current = new StringBuilder('hello');
            assert.throw(() => { current.insertAt(undefined) }, 'Argument must be string');
        });
    });

    it('Should work dude',function(){
        let current = new StringBuilder('hello');
        current.append(', there');
        current.prepend('User, ');
        current.insertAt('woop', 5);
        current.remove(6, 3);
        assert.equal('User,w hello, there',current.toString())
    });
});