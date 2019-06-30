let assert = require("chai").assert;
let AutoService = require('./AutoService');

describe('Constructor', function () {
    it('Should return proper garageCapacity', function () {
        let current = new AutoService(5);
        assert.equal(5, current.garageCapacity);
    });

    it('Should return empty workInProgress array', function () {
        let current = new AutoService(5);
        assert.deepEqual([], current.workInProgress);
    });

    it('Should return empty backlogWork array', function () {
        let current = new AutoService(5);
        assert.deepEqual([], current.backlogWork);
    });
});

describe('Getters', function () {
    it('Should return proper availableSpace - return value should be 1', function () {
        let current = new AutoService(2);
        current.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
        assert.equal(1, current.availableSpace);
    });

});

describe('SignUpForReview', function () {
    it('0 available space, so add it to backlogWork', function () {
        let current = new AutoService(0);
        current.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
        assert.equal(1, current.backlogWork.length);
    });

    it('Should add it to workInProgress', function () {
        let current = new AutoService(2);
        current.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
        assert.equal(1, current.workInProgress.length);
    });
});

describe('CarInfo', function () {
    it('Should return - message for non-existing car', function () {
        let current = new AutoService(2);
        assert.equal('There is no car with platenumber CA1234CA and owner Peter.', current.carInfo('CA1234CA', 'Peter'));
    });

    it('Should return - the car from signUpForReview', function () {
        let current = new AutoService(2);
        current.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });

        let dummy = {
            plateNumber: 'CA1234CA',
            clientName: 'Peter',
            carInfo: { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' }
        };

        assert.deepEqual(dummy, current.carInfo('CA1234CA', 'Peter'));
    });

    it('Should return - the car from backlogWork', function () {
        let current = new AutoService(0);
        current.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });

        let dummy = {
            plateNumber: 'CA1234CA',
            clientName: 'Peter',
            carInfo: { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' }
        };

        assert.deepEqual(dummy, current.carInfo('CA1234CA', 'Peter'));
    });
}); 

describe('RepairCar',function(){
    it('Should return message - No clients, we are just chilling...',function(){
        let current = new AutoService(5);
        assert.equal('No clients, we are just chilling...',current.repairCar());
    });

    it('Should repair the given car from workInProgress - 2 broken parts ( engine and doors )',function(){
        let current = new AutoService(5);
        current.signUpForReview('Peter', 'CA1234CA', { 'engine': 'broken', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
        assert.equal('Your engine and doors were repaired.',current.repairCar());
    });

    it('Should repair the given car from backlogWork - 2 broken parts ( engine and doors )',function(){
        let current = new AutoService(0);
        current.signUpForReview('Peter', 'CA1234CA', { 'engine': 'broken', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
        assert.equal('Your engine and doors were repaired.',current.repairCar());
    });

    it('Should return message - Your car was fine, nothing was repaired.',function(){
        let current = new AutoService(0);
        current.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'Diamond' });
        assert.equal('Your car was fine, nothing was repaired.',current.repairCar());
    });
});