let assert = require("chai").assert;
let Warehouse = require('./Warehouse');

describe('Constructor', function () {
    it('Should throw error for negative input', function () {
        assert.throw(() => new Warehouse(-5), 'Invalid given warehouse space');
    });

    it('Should throw error for 0 input', function () {
        assert.throw(() => new Warehouse(0), 'Invalid given warehouse space');
    });

    it('Should work properly - capacity', function () {
        let current = new Warehouse(10);
        assert.equal(10, current.capacity)
    });

    it('Should work properly - availableProducts', function () {
        let current = new Warehouse(10);
        let expectedResult = { 'Food': {}, 'Drink': {} };
        assert.deepEqual(expectedResult, current.availableProducts)
    });
});

describe('addProduct', function () {
    it('Should throw error for not enough capacity', function () {
        let current = new Warehouse(1);
        assert.throw(() => current.addProduct('Drink', 'Cola', 5), 'There is not enough space or the warehouse is already full');
    });

    it('Should throw error for full warehouse', function () {
        let current = new Warehouse(5);
        current.addProduct('Food', 'Burger', 5);
        assert.throw(() => current.addProduct('Drink', 'Cola', 5), 'There is not enough space or the warehouse is already full');
    });

    it('Should add the product to warehouse and return the object', function () {
        let current = new Warehouse(5);
        let burgetDummy = { Burger: 5 };
        assert.deepEqual(burgetDummy, current.addProduct('Food', 'Burger', 5));
        assert.equal(true, current.availableProducts.Food.hasOwnProperty('Burger'));
    });

    it('Should add the quantity of existing product', function () {
        let current = new Warehouse(25);
        current.addProduct('Food', 'Burger', 5);
        current.addProduct('Food', 'Burger', 5);
        let burgetDummy = { Burger: 15 };
        assert.deepEqual(burgetDummy, current.addProduct('Food', 'Burger', 5));
    });
});

describe('orderProducts', function () {
    it('Should sort the given products type', function () {
        let current = new Warehouse(90);
        current.addProduct('Food', 'Burger', 15);
        current.addProduct('Food', 'Soup', 8);
        current.addProduct('Food', 'Leshta', 5);
        current.addProduct('Food', 'Bob', 2);
        current.orderProducts('Food');

        let expectedResult = { Burger: 15, Soup: 8, Leshta: 5, Bob: 2 };
        assert.deepEqual(expectedResult, current.availableProducts.Food);
    });
});

describe('occupiedCapacity',function(){
    it('Should return the proper value - 6',function(){
        let current = new Warehouse(10);
        current.addProduct('Food','Bob',1);
        current.addProduct('Food','Soup',1);
        current.addProduct('Food','Leshta',1);
        current.addProduct('Drink','Water',1);
        current.addProduct('Drink','Wine',1);
        current.addProduct('Drink','Vodka',1);

        assert.equal(6,current.occupiedCapacity());
    });

    it('Should return the proper value - 0',function(){
        let current = new Warehouse(5);
        assert.equal(0,current.occupiedCapacity());
    });
});

describe('revision',function(){
    it('Should thor error - empty warehouse',function(){
        let current = new Warehouse(2);
        assert.equal('The warehouse is empty',current.revision());
    });

    it('Should work correctly',function(){
        let current = new Warehouse(90);
        current.addProduct('Food', 'Burger', 15);
        current.addProduct('Food', 'Soup', 8);
        current.addProduct('Food', 'Leshta', 5);

        let expectedResult = 'Product type - [Food]\n- Burger 15\n- Soup 8\n- Leshta 5\nProduct type - [Drink]';
        assert.equal(expectedResult,current.revision());
    });

});

describe('scrapeAProduct',function(){
    it('Should throw error for non-existing product',function(){
        let current = new Warehouse(5);
        assert.throw(() => current.scrapeAProduct('Wine'),'Wine do not exists');
    });

    it('Should scrape existing product',function(){
        let current = new Warehouse(5);
        current.addProduct('Drink','Wine',5);
        let expectedResult = { Wine: 0 };
        assert.deepEqual(expectedResult,current.scrapeAProduct('Wine'))
    });
});