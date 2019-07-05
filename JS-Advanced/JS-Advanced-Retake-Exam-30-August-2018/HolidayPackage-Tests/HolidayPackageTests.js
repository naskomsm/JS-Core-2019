let assert = require("chai").assert;
let HolidayPackage = require('./HolidayPackage');

describe('constructor',function(){
    it('should create proper instance',function(){
        let current = new HolidayPackage('Italy','Summer');

        assert.deepEqual([],current.vacationers);
        assert.equal('Italy',current.destination);
        assert.equal('Summer',current.season);
        assert.equal(false,current.insuranceIncluded);
    });

    it('test for insuranceIncluded setter - proper value',function(){
        let current = new HolidayPackage('Italy','Summer');
        assert.equal(false,current.insuranceIncluded);
        current.insuranceIncluded = true;
        assert.equal(true,current.insuranceIncluded);
    });

    it('test for insuranceIncluded setter - throw error',function(){
        let current = new HolidayPackage('Italy','Summer');
        assert.equal(false,current.insuranceIncluded);
        assert.throw(() => current.insuranceIncluded = 6);
        assert.throw(() => current.insuranceIncluded = '6');
        assert.throw(() => current.insuranceIncluded = []);
        assert.throw(() => current.insuranceIncluded = {});
    });
});

describe('vacationers',function(){
    it('test for empty vacationares',function(){
        let current = new HolidayPackage('Italy','Summer');
        // current.addVacationer('Atanas');
        assert.equal('No vacationers are added yet',current.showVacationers());
    }); 

    it('test for vacationares',function(){
        let current = new HolidayPackage('Italy','Summer');
        current.addVacationer('Atanas Kolev');
        assert.equal('Vacationers:\nAtanas Kolev',current.showVacationers());
    }); 
});

describe('addVacationer',function(){
    it('should throw error - non-empty string',function(){
        let current = new HolidayPackage('Italy','Summer');
        assert.throw(() => current.addVacationer(' '),'Vacationer name must be a non-empty string');
        assert.throw(() => current.addVacationer(5),'Vacationer name must be a non-empty string');
        assert.throw(() => current.addVacationer([]),'Vacationer name must be a non-empty string');
        assert.throw(() => current.addVacationer({}),'Vacationer name must be a non-empty string');
    }); 

    it('should throw error - need second name',function(){
        let current = new HolidayPackage('Italy','Summer');
        assert.throw(() => current.addVacationer('Atanas'),'Name must consist of first name and last name');
    }); 

    it('should work properly',function(){
        let current = new HolidayPackage('Italy','Summer');
        current.addVacationer('Atanas Kolev');
        let expected = ['Atanas Kolev'];
        assert.deepEqual(expected,current.vacationers);
    }); 
}); 

describe('generateHolidayPackage',function(){
    it('should throw error - at least 1 vacationer',function(){
        let current = new HolidayPackage('Italy','Summer');
        assert.throw(() => current.generateHolidayPackage(),'There must be at least 1 vacationer added');
    });

    it('should work correctly - without insurence',function(){
        let current = new HolidayPackage('Italy','Summer');
        current.addVacationer('Atanas Kolev');
        current.addVacationer('Georgi Petrov');

        assert.equal('Holiday Package Generated\nDestination: Italy\nVacationers:\nAtanas Kolev\nGeorgi Petrov\nPrice: 1000',current.generateHolidayPackage());
    });

    it('should work correctly - without insurence',function(){
        let current = new HolidayPackage('Italy','Autumn');
        current.addVacationer('Atanas Kolev');
        current.addVacationer('Georgi Petrov');

        assert.equal('Holiday Package Generated\nDestination: Italy\nVacationers:\nAtanas Kolev\nGeorgi Petrov\nPrice: 800',current.generateHolidayPackage());
    });

    it('should work correctly - with insurence',function(){
        let current = new HolidayPackage('Italy','Summer');
        current.addVacationer('Atanas Kolev');
        current.addVacationer('Georgi Petrov');
        current.insuranceIncluded = true;

        assert.equal('Holiday Package Generated\nDestination: Italy\nVacationers:\nAtanas Kolev\nGeorgi Petrov\nPrice: 1100',current.generateHolidayPackage());
    });

     it('should work correctly - with insurence',function(){
        let current = new HolidayPackage('Italy','Autumn');
        current.addVacationer('Atanas Kolev');
        current.addVacationer('Georgi Petrov');
        current.insuranceIncluded = true;

        assert.equal('Holiday Package Generated\nDestination: Italy\nVacationers:\nAtanas Kolev\nGeorgi Petrov\nPrice: 900',current.generateHolidayPackage());
    });
});