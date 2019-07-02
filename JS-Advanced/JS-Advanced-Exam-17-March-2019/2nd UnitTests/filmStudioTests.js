let assert = require("chai").assert;
let FilmStudio = require('./FilmStudio');

describe('Constructor', function () {
    it('Property name should be settted properly', function () {
        let current = new FilmStudio('Boyana');
        assert.equal('Boyana', current.name);
    });
    it('Property films array should be empty', function () {
        let current = new FilmStudio('Boyana');
        assert.equal(0, current.films.length);
    });
});

describe('makeMovie', function () {
    it('Should throw error - Invalid arguments count', function () {
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.makeMovie('The Avengers', [], 'third parameter'), 'Invalid arguments count');
    });
    it('Should throw error - Invalid arguments ( first argument invalid )', function () {
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.makeMovie(1, ['Gosho', 'Pesho']), 'Invalid arguments');
    });
    it('Should throw error - Invalid arguments ( second argument invalid )', function () {
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.makeMovie('The Avengers', 'Gosho'), 'Invalid arguments');
    });
    it('Should throw error - Invalid arguments', function () {
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.makeMovie(1, 'Gosho'), 'Invalid arguments');
    });
    it('Should create film - not existing before', function () {
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        assert.equal(1, current.films.length);
    });
    it('Should create film - existing before', function () {
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);

        let firstMovie = current.films[0];
        let secondMovie = current.films[1];

        assert.equal(firstMovie.filmName, 'The Avengers');
        assert.equal(secondMovie.filmName, 'The Avengers 2');
    });
});

describe('casting', function () {
    it('Should return string - There are no films yet in Boyana.', function () {
        let current = new FilmStudio('Boyana');
        assert.equal('There are no films yet in Boyana.', current.casting('Atanas', 'Thor'));
    });
    it('Should return string - Atanas, we cannot find a Thor role...', function () {
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy']);
        assert.equal('Atanas, we cannot find a Thor role...', current.casting('Atanas', 'Thor'));
    });
    it('Should give the role to the actor', function () {
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        assert.equal('You got the job! Mr. Atanas you are next Thor in the The Avengers. Congratz!', current.casting('Atanas', 'Thor'));
    });
});

describe('lookForProducer', function () {
    it('Should return string - The Avengers do not exist yet, but we need the money...',function(){
        let current = new FilmStudio('Boyana');
        assert.throw(() => current.lookForProducer('The Avengers'),'The Avengers do not exist yet, but we need the money...');
    });
    it('Should work correctly',function(){
        let current = new FilmStudio('Boyana');
        current.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        assert.equal('Film name: The Avengers\nCast:\nfalse as Iron-Man\nfalse as Thor\nfalse as Hulk\nfalse as Arrow guy\n',current.lookForProducer('The Avengers'));
    });
});