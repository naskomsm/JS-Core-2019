let assert = require("chai").assert;
let SubscriptionCard = require('./SubscriptionCard');

describe('constructor and getters',function(){
    it('init should work - getters and ctor',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        assert.equal(current.firstName,'Atanas');
        assert.equal(current.lastName,'Kolev');
        assert.equal(current.SSN,'00000000');
        assert.equal(current.isBlocked,false);
        assert.deepEqual(current._subscriptions,[]);
    });

    it('should not be able to change firstName and lastName and SSN',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        current.firstName = 'Stoqn';
        current.lastName = 'Shopov';
        current.SSN = '123456';
        assert.equal(current.firstName,'Atanas');
        assert.equal(current.lastName,'Kolev');
        assert.equal(current.SSN,'00000000');
    });
}); 

describe('addSubscription',function(){
    it('working with some line',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        current.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        let dummy = {
            endDate: new Date('2018-05-21'),
            line: '120',
            startDate: new Date('2018-04-22')
        };
        assert.deepEqual(current._subscriptions,[dummy]);
    }); 

    it('working with *',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        current.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
        let dummy = {
            endDate: new Date('2018-05-21'),
            line: '*',
            startDate: new Date('2018-04-22')
        };
        assert.deepEqual(current._subscriptions,[dummy]);
    });
});

describe('isValid',function(){
    it('unvalid',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        assert.equal(false,current.isValid('120', new Date('2018-04-22')));
    });

    it('blocked',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        current.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        current.block();
        assert.equal(false,current.isValid('120', new Date('2018-04-22')));
    });

    it('valid',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        current.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        assert.equal(true,current.isValid('120', new Date('2018-04-22')));
    });

    it('valid',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        current.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
        assert.equal(true,current.isValid('*', new Date('2018-04-22')));
    });
});

describe('block and unblock',function(){
    it('block',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        current.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        current.block();
        assert.equal(true,current.isBlocked);
    });

    it('unblock',function(){
        let current = new SubscriptionCard('Atanas','Kolev','00000000');
        current.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        current.block();
        current.unblock();
        assert.equal(false,current.isBlocked);
    });
}); 