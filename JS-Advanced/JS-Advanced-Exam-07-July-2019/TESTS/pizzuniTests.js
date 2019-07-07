let assert = require("chai").assert;
let PizzUni = require('./02. PizzUni_Ресурси');

describe('constructor', function () {
    it('Should registerdUsers - empty array', function () {
        let current = new PizzUni();
        assert.deepEqual([], current.registeredUsers);
    });

    it('Should availableProducts - work', function () {
        let current = new PizzUni();
        let dummy = {
            pizzas: ['Italian Style', 'Barbeque Classic', 'Classic Margherita'],
            drinks: ['Coca-Cola', 'Fanta', 'Water']
        };
        assert.deepEqual(dummy, current.availableProducts);
    });

    it('Should orders - empty array', function () {
        let current = new PizzUni();
        assert.deepEqual([], current.orders);
    });
});

describe('registerUser', function () {
    it('Should throw error for user email', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');
        assert.throw(() => current.registerUser('naskobg123@abv.bg'), `This email address (naskobg123@abv.bg) is already being used!`);
    });

    it('Should throw error for user email', function () {
        let current = new PizzUni();
        let dummy = {
            email: undefined,
            orderHistory: []
        };

        let dummy2 = {
            email: 1,
            orderHistory: []
        };

        assert.deepEqual(dummy,current.registerUser(undefined))
        assert.deepEqual(dummy2,current.registerUser(1))
    });

    it('Should add user with email', function () {
        let current = new PizzUni();

        let dummy = {
            email: 'naskobg123@abv.bg',
            orderHistory: []
        };

        assert.deepEqual(dummy, current.registerUser('naskobg123@abv.bg'));
        assert.equal(1, current.registeredUsers.length === 1);
    });
});

describe('makeOrder', function () {
    it('Should throw error - unregistered user', function () {
        let current = new PizzUni();
        assert.throw(() => current.makeAnOrder('naskobg123@abv.bg', 'Classic Margherita', 'Fanta'), `You must be registered to make orders!`);
    });

    it('Should throw error for at least 1 pizza', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');
        assert.throw(() => current.makeAnOrder('naskobg123@abv.bg', 'Fanta'), 'You must order at least 1 Pizza to finish the order.');
    });

    it('Should work - both products', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');
        current.makeAnOrder('naskobg123@abv.bg', 'Classic Margherita', 'Fanta');

        let user = current.registeredUsers.find(x => x.email === 'naskobg123@abv.bg');
        let userOrder = {
            orderedPizza: 'Classic Margherita',
            orderedDrink: 'Fanta'
        };

        assert.deepEqual(userOrder, user.orderHistory[0]);
    });

    it('Should work - not existing drink', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');
        current.makeAnOrder('naskobg123@abv.bg', 'Classic Margherita', 'randomdRink');

        let user = current.registeredUsers.find(x => x.email === 'naskobg123@abv.bg');
        let userOrder = {
            orderedPizza: 'Classic Margherita',
        };

        assert.deepEqual(userOrder, user.orderHistory[0]);
    });

    it('Should work - only pizza', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');
        current.makeAnOrder('naskobg123@abv.bg', 'Classic Margherita');

        let user = current.registeredUsers.find(x => x.email === 'naskobg123@abv.bg');
        let userOrder = {
            orderedPizza: 'Classic Margherita',
        };

        assert.deepEqual(userOrder, user.orderHistory[0]);
    });

    it('Should work - return length', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');
        current.makeAnOrder('naskobg123@abv.bg', 'Classic Margherita');

        let user = current.registeredUsers.find(x => x.email === 'naskobg123@abv.bg');
        assert.deepEqual(1, user.orderHistory.length);
    });

    it('Working',function(){
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');

        assert.equal(0,current.makeAnOrder('naskobg123@abv.bg', 'Classic Margherita'))
    })
});

describe('detailsAboutMyOrder', function () {
    it('Should return string', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');
        current.makeAnOrder('naskobg123@abv.bg', 'Classic Margherita');

        assert.equal('Status of your order: pending', current.detailsAboutMyOrder(0));
    })

    it('Should return string', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');
        current.makeAnOrder('naskobg123@abv.bg', 'Classic Margherita');

        assert.equal(undefined, current.detailsAboutMyOrder(1));
    });
});

describe('does the userExist', function () {
    it('should return user', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');

        let dummy = {
            email: 'naskobg123@abv.bg',
            orderHistory: []
        };

        assert.deepEqual(dummy, current.doesTheUserExist('naskobg123@abv.bg'))
    })

    it('should return ?', function () {
        let current = new PizzUni();

        assert.deepEqual(undefined, current.doesTheUserExist('naskobg123@abv.bg'))
    })
});

describe('completeOrder', function () {
    it('Should work correclty', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');
        current.makeAnOrder('naskobg123@abv.bg', 'Classic Margherita');

        let dummy = current.orders[0];

        assert.deepEqual(dummy, current.completeOrder());
    })

    it('Should work correclty', function () {
        let current = new PizzUni();
        current.registerUser('naskobg123@abv.bg');

        let dummy = current.orders[0];
        assert.deepEqual(dummy, current.completeOrder());
    })
});