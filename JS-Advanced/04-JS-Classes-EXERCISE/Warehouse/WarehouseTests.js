let assert = require("chai").assert;
let Warehouse = require('./Warehouse');

describe('Constructor', function () {
    it('Should work properly', function () {
        let current = new Warehouse(5);
        assert.equal(5, current.capacity);
    });

    it('Should throw error for negative number in ctor', function () {
        assert.throw(() => new Warehouse(-5));
    });

    it('Should work properly', function () {
        let current = new Warehouse(5);
        assert.deepEqual({'Food': {}, 'Drink': {}}, current.availableProducts);
    });
});

describe('AddProduct', function () {
    it('Capacity setter should work', function () {
        let current = new Warehouse(5);
        current.capacity = 6;
        assert.equal(6, current.capacity);
    });

    it('Capacity setter should throw error', function () {
        let current = new Warehouse(5);
        assert.throw(() => current.capacity = -6);
    });

    it('Capacity getter should work', function () {
        let current = new Warehouse(5);
        assert.equal(5, current.capacity);
    });

    it('Should throw error for not enough space', function () {
        let current = new Warehouse(1);
        assert.throw(() => current.addProduct('Food', 'Poop', 5));
    });

    it('Should work correctly', function () {
        let current = new Warehouse(111);
        let testObj = current.addProduct('Food', 'Poop', 5);
        assert.equal(testObj, current.addProduct('Food', 'Poop', 5));
    });

    it('Should work correctly', function () {
        let current = new Warehouse(111);
        let testObj = current.addProduct('Drink', 'Airqn', 5);
        assert.equal(testObj, current.addProduct('Drink', 'Airqn', 5));
    });

    it('Should work correctly when the same product is added', function () {
        let current = new Warehouse(111);
        let testObj = current.addProduct('Food', 'Poop', 5);
        assert.equal(testObj, current.addProduct('Food', 'Poop', 5));
    });
});

describe('orderProducts', function () {
    it('Should sort properly', function () {
        let current = new Warehouse(1111);
        current.addProduct('Food', 'Poop', 51);
        current.addProduct('Food', 'Ice cream', 15);
        current.addProduct('Drink', 'Water', 5);
        current.addProduct('Drink', 'Cola', 59);

        let sorted = current.orderProducts('Food');
        assert.deepEqual(sorted, current.orderProducts('Food'));
    });

    it('Should sort properly', function () {
        let current = new Warehouse(1111);

        let sorted = current.orderProducts('Food');
        assert.deepEqual(sorted, current.orderProducts('Food'));
    });
});

describe('occupiedCapacity', function () {
    it('Should sort properly', function () {
        let current = new Warehouse(1000);
        current.addProduct('Food', 'Poop', 51);
        current.addProduct('Food', 'Ice cream', 15);
        current.addProduct('Food', 'Bob', 5);
        current.addProduct('Food', 'Leshta', 59);
        assert.equal(130, current.occupiedCapacity());
    });

    it('Should sort properly', function () {
        let current = new Warehouse(1000);
        assert.equal(0, current.occupiedCapacity());
    });
});

describe('revision', function () {
    it('Should sort properly', function () {
        let current = new Warehouse(1000);
        current.addProduct('Food', 'Poop', 51);
        current.addProduct('Food', 'Ice cream', 15);
        current.addProduct('Drink', 'Cola', 5);
        current.addProduct('Drink', 'Pepsi', 59);

        let expectedString = 'Product type - [Food]\n- Poop 51\n- Ice cream 15\nProduct type - [Drink]\n- Cola 5\n- Pepsi 59';
        assert.equal(expectedString, current.revision());
    });

    it('Should sort properly', function () {
        let current = new Warehouse(1000);
        assert.equal('The warehouse is empty', current.revision());
    });
});

describe('scrapeAProduct', function () {
    it('Should work correctly',function(){
        let current = new Warehouse(1000);
        let dummy = current.addProduct('Food', 'Poop', 51);
        let expexted = current.scrapeAProduct('Poop',21);
        assert.equal(expexted,dummy);
    });

    it('Should throw error',function(){
        let current = new Warehouse(1000);
        let dummy = current.addProduct('Food', 'Poop', 51);
        assert.throw(() => current.scrapeAProduct(undefined,21));
    });

    it('Should work correctly',function(){
        let current = new Warehouse(1000);
        let dummy = current.addProduct('Food', 'Poop', 51);
        let expexted = current.scrapeAProduct('Poop',100);
        assert.equal(expexted,dummy);
    });
});