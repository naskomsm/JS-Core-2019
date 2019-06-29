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

    it('Should throw error for wrong input type', function () {
        assert.throw(() => new Warehouse('-5'));
    });

    it('Should throw error for wrong input type', function () {
        assert.throw(() => new Warehouse({}));
    });

    it('Should work properly', function () {
        let current = new Warehouse(5);
        assert.deepEqual({'Food': {}, 'Drink': {}}, current.availableProducts);
    });

    it('Capacity setter should work', function () {
        let current = new Warehouse(5);
        current.capacity = 6;
        assert.equal(6, current.capacity);
    });

    it('Capacity setter should throw error', function () {
        let current = new Warehouse(5);
        assert.throw(() => current.capacity = -6);
    });

    it('Capacity setter should throw error', function () {
        let current = new Warehouse(5);
        assert.throw(() => current.capacity = '-6');
    });

    it('Capacity setter should throw error', function () {
        let current = new Warehouse(5);
        assert.throw(() => current.capacity = []);
    });

    it('Capacity setter should throw error', function () {
        let current = new Warehouse(5);
        assert.throw(() => current.capacity = {});
    });

    it('Capacity setter should throw error', function () {
        let current = new Warehouse(5);
        assert.throw(() => current.capacity = 0);
    });

    it('Capacity getter should work', function () {
        let current = new Warehouse(5);
        assert.equal(5, current.capacity);
    });
});

describe('AddProduct', function () {
    it('Should throw error for not enough space', function () {
        let current = new Warehouse(1);
        assert.throw(() => current.addProduct('Food', 'Poop', 5));
    });

    it('Should throw error for not enough space', function () {
        let current = new Warehouse(1);
        assert.throw(() => current.addProduct('Drink', 'Cola', 5));
    });

    it('Should work correctly with food', function () {
        let current = new Warehouse(111);
        current.addProduct('Food', 'Poop', 5);

        let result = current.availableProducts['Food'];
        assert.equal(result['Poop'], 5);
    });

    it('Should work correctly with same food', function () {
        let current = new Warehouse(111);
        current.addProduct('Food', 'Poop', 5);
        current.addProduct('Food', 'Poop', 5);

        let result = current.availableProducts['Food'];
        assert.equal(result['Poop'], 10);
    });

    it('Should work correctly with drink', function () {
        let current = new Warehouse(111);
        current.addProduct('Drink', 'Poop', 5);

        let result = current.availableProducts['Drink'];
        assert.equal(result['Poop'], 5);
    });

    it('Should work correctly with drink', function () {
        let current = new Warehouse(111);
        current.addProduct('Drink', 'Poop', 5);
        current.addProduct('Drink', 'Poop', 5);

        let result = current.availableProducts['Drink'];
        assert.equal(result['Poop'], 10);
    });
});

describe('orderProducts', function () {
    it('Should sort properly', function () {
        let current = new Warehouse(1111);
        current.addProduct('Food', 'Poop', 51);
        current.addProduct('Food', 'Ice cream', 15);
        current.addProduct('Food', 'Water', 5);
        current.addProduct('Food', 'Cola', 59);

        let sorted = 'Poop Ice cream Water Cola'
        assert.equal(Object.keys(current.availableProducts['Food']).join(' '), sorted);
    });

    it('Should sort properly', function () {
        let current = new Warehouse(1111);
        current.addProduct('Drink', 'Poop', 51);
        current.addProduct('Drink', 'Ice cream', 15);
        current.addProduct('Drink', 'Water', 5);
        current.addProduct('Drink', 'Cola', 59);

        let sorted = 'Poop Ice cream Water Cola'
        assert.equal(Object.keys(current.availableProducts['Drink']).join(' '), sorted);
    });
});

describe('occupiedCapacity', function () {
    it('Should sort properly', function () {
        let current = new Warehouse(1000);
        current.addProduct('Food', 'Poop', 51);
        current.addProduct('Food', 'Ice cream', 15);
        current.addProduct('Drink', 'Cola', 5);
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
    it('Should reduce quantity',function(){
        let current = new Warehouse(1000);

        current.addProduct('Food', 'Poop', 2);
        current.scrapeAProduct('Poop',1);

        assert.equal(current.availableProducts['Food']['Poop'],1);
    });

    it('Should throw error',function(){
        let current = new Warehouse(1000);
        assert.throw(() => current.scrapeAProduct(undefined,21));
    });

    it('Should throw error',function(){
        let current = new Warehouse(1000);
        assert.throw(() => current.scrapeAProduct('Banana',11));
    });

    it('Should reset product',function(){
        let current = new Warehouse(1000);

        current.addProduct('Food', 'Poop', 2);
        current.scrapeAProduct('Poop',3);

        assert.equal(current.availableProducts['Food']['Poop'],0);
    });
});