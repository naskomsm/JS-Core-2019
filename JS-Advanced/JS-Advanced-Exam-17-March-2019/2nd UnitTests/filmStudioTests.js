let assert = require("chai").assert;
let FilmStudio = require('./FilmStudio');

describe('Constructor',function(){
    it("Should instance properly",function(){
        let current = new FilmStudio('Boyana');
        assert.equal('Boyana',current.name);
        assert.deepEqual([],current.films);
    });
});

describe('makeMovie',function(){
    it('should add movie with all roles',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        assert.equal(1,current.films.length);
    });

    it('should work with adding 2 movies with same name',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        assert.equal('The Avengers 2',current.films[1].filmName)
    });

    it('should throw error',function(){
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.makeMovie(1, ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']));
        assert.throw(() => current.makeMovie('The Avengers', {}));
        assert.throw(() => current.makeMovie('The Avengers', 1));
        assert.throw(() => current.makeMovie('The Avengers', 'a'));
        assert.throw(() => current.makeMovie(1, ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy'],1,2,3,));
    });
});

describe('casting',function(){
    it('should work correctly',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        assert.equal('You got the job! Mr. Atanas you are next Thor in the The Avengers. Congratz!',current.casting('Atanas','Thor'));
    });

    it('should work correctly',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy']);
        assert.equal('Atanas, we cannot find a Thor role...',current.casting('Atanas','Thor'));
    });

    it('should work correctly',function(){
        let current = new FilmStudio('Boyana');
        assert.equal('There are no films yet in Boyana.',current.casting('Atanas','Thor'));
    });
});

describe('lookForProducer',function(){
    it('Should work correctly',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy']);
        assert.equal('Film name: The Avengers\nCast:\nfalse as Iron-Man\nfalse as Hulk\nfalse as Arrow guy\n',current.lookForProducer('The Avengers'));
    });

    it('Should throw error',function(){
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.lookForProducer('The Avengers'));

    });
});