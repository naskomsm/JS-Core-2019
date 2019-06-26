let assert = require("chai").assert;
let FilmStudio = require('./FilmStudio');

describe('Constructor',function(){
    it("Should instance properly",function(){
        let current = new FilmStudio();
        assert.equal(undefined,current.name);
    });

    it("Should instance properly",function(){
        let current = new FilmStudio('Boyana');
        assert.equal('Boyana',current.name);
    });

    it("Should instance properly",function(){
        let current = new FilmStudio('Boyana');
        assert.deepEqual([],current.films);
    }); 

    it("Should instance properly",function(){
        let current = new FilmStudio('Boyana');
        assert.equal(0,current.films.length);
    });
});

describe('makeMovie',function(){
    it('should add movie with all roles and movies',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        assert.equal(2,current.films.length);
        assert.equal('The Avengers',current.films[0].filmName);
        assert.equal('The Avengers 2',current.films[1].filmName);
    });

    it('should add movie with 1 role',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man']);
        assert.equal(1,current.films.length);
        assert.equal('The Avengers',current.films[0].filmName)
    });

    it('should work - adding 2 movies with same name',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        assert.equal('The Avengers 2',current.films[1].filmName)
    });

    it('should throw error for more than one arguments',function(){
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.makeMovie(1, ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy'],1,2,3),'Invalid arguments count');
    });

    it('Should throw error for invalid first parameter',function(){
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.makeMovie(123, ['Iron-Man','Thor','Hulk']),'Invalid arguments');
    });

    it('Should throw error for invalid first parameter',function(){
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.makeMovie(undefined, ['Iron-Man','Thor','Hulk']),'Invalid arguments');
    });

    it('Should throw error for invalid first parameter',function(){
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.makeMovie({}, ['Iron-Man','Thor','Hulk']),'Invalid arguments');
    });

    it('Should throw error for invalid first parameter',function(){
        let current = new FilmStudio('Boyana');
        assert.throws(() => current.makeMovie([], ['Iron-Man','Thor','Hulk']),'Invalid arguments');
    });

    it('Should throw error for invalid second parameter',function(){
        let current = new FilmStudio('Boyana');
        assert.throws(() => current.makeMovie('The Avengers', 1),'Invalid arguments');
    });

    it('Should throw error for invalid second parameter',function(){
        let current = new FilmStudio('Boyana');
        assert.throws(() => current.makeMovie('The Avengers', {}),'Invalid arguments');
    });

    
    it('Should throw error for invalid second parameter',function(){
        let current = new FilmStudio('Boyana');
        assert.throws(() => current.makeMovie('The Avengers', undefined),'Invalid arguments');
    });

    it('Should throw error for invalid 2 parameters',function(){
        let current = new FilmStudio('Boyana');
        assert.throws(() => current.makeMovie({}, {}),'Invalid arguments');
    });

    it('Should throw error for invalid 2 parameters',function(){
        let current = new FilmStudio('Boyana');
        assert.throws(() => current.makeMovie(undefined, undefined),'Invalid arguments');
    });
});

describe('casting',function(){
    it('should work correctly',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        assert.equal('You got the job! Mr. Atanas you are next Thor in the The Avengers. Congratz!',current.casting('Atanas','Thor'));
    });

    it('should work correctly for non existing role in film',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy']);
        assert.equal('Atanas, we cannot find a Thor role...',current.casting('Atanas','Thor'));
    });

    it('should work correctly for no film made yet in #Boyana',function(){
        let current = new FilmStudio('Boyana');
        assert.equal('There are no films yet in Boyana.',current.casting('Atanas','Thor'));
    });
});

describe('lookForProducer',function(){
    it('Should work correctly false edition',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy']);
        assert.equal('Film name: The Avengers\nCast:\nfalse as Iron-Man\nfalse as Hulk\nfalse as Arrow guy\n',current.lookForProducer('The Avengers'));
    });

    it('Should work correctly true edition',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy']);
        current.casting('Atanas','Iron-Man');
        current.casting('Gosho','Hulk');
        current.casting('Ivko','Arrow guy');
        assert.equal('Film name: The Avengers\nCast:\nAtanas as Iron-Man\nGosho as Hulk\nIvko as Arrow guy\n',current.lookForProducer('The Avengers'));
    });

    it('Should throw error non existing movie',function(){
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.lookForProducer('The Avengers'));

    });
});