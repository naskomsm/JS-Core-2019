let assert = require("chai").assert;
let PaymentPackage = require('./PaymentPackage');

describe('Constructor',function(){
    it('Should init properly',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.equal('HR Services',current.name);
        assert.equal(1700,current.value);
        assert.equal(20,current.VAT);
        assert.equal(true,current.active);
    });
});

describe('getters and setters',function(){
    it('Get for name',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.equal('HR Services',current.name);
    }); 

    it('Set for name',function(){
        let current = new PaymentPackage('HR Services',1700);
        current.name = 'HR';
        assert.equal('HR',current.name);
    });

    it('Should throw error - name',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.throw(() => { current.name = {} }, 'Name must be a non-empty string');
    });

    it('Should throw error - name',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.throw(() => { current.name = '' }, 'Name must be a non-empty string');
    })

    it('Get for value',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.equal(1700,current.value);
    }); 

    it('Set for value',function(){
        let current = new PaymentPackage('HR Services',1700);
        current.value = 2000;
        assert.equal(2000,current.value);
    });

    it('Should throw error - value',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.throw(() => { current.value = '' }, 'Value must be a non-negative number');
    })

    it('Should throw error - value',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.throw(() => { current.value = -8 }, 'Value must be a non-negative number');
    })

    it('Get for VAT',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.equal(20,current.VAT);
    }); 

    it('Set for VAT',function(){
        let current = new PaymentPackage('HR Services',1700);
        current.VAT = 50;
        assert.equal(50,current.VAT);
    });

    it('Should throw error - value',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.throw(() => { current.VAT = '' }, 'VAT must be a non-negative number');
    })

    it('Should throw error - value',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.throw(() => { current.VAT = -7 }, 'VAT must be a non-negative number');
    })

    it('Get for active',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.equal(true,current.active);
    }); 

    it('Set for active',function(){
        let current = new PaymentPackage('HR Services',1700);
        current.active = false;
        assert.equal(false,current.active);
    });

    it('Should throw error - value',function(){
        let current = new PaymentPackage('HR Services',1700);
        assert.throw(() => { current.active = -7 }, 'Active status must be a boolean');
    })
});

describe('toString()',function(){
    it('Should work',function(){
        const packages = [
            new PaymentPackage('HR Services', 1500),
            new PaymentPackage('Consultation', 800),
            new PaymentPackage('Partnership Fee', 7000),
        ];
        
        assert.equal('Package: HR Services\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800\nPackage: Consultation\n- Value (excl. VAT): 800\n- Value (VAT 20%): 960\nPackage: Partnership Fee\n- Value (excl. VAT): 7000\n- Value (VAT 20%): 8400',packages.join('\n'))
    });
}); 