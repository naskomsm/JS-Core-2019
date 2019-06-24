class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }


    // working
    loadProducts(products) {
        for (let product of products) {
            let productInfo = product.split(' ');
            let productName = productInfo[0];
            let productQuantity = +productInfo[1];
            let productPrice = +productInfo[2];

            if (this.budget >= productPrice) {
                if (!this.productsInStock.hasOwnProperty(productName)) {
                    this.productsInStock[productName] = 0;
                }

                this.productsInStock[productName] += productQuantity;
                this.budget -= productPrice;
                this.actionsHistory.push(`Successfully loaded ${productQuantity} ${productName}`);

            } else {
                this.actionsHistory.push(`There was not enough money to load ${productQuantity} ${productName}`);
            }
        }

        return this.actionsHistory.join('\n');
    }

    addToMenu(mealName, neededProducts, price) {
        if (this.menu.hasOwnProperty(mealName)) {
            return `The ${mealName} is already in our menu, try something different.`;
        }

        this.menu[mealName] = {
            neededProducts,
            price: +price
        };

        return `Great idea! Now with the ${mealName} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
    }

    showTheMenu() {
        if (Object.keys(this.menu).length === 0) {
            return `Our menu is not ready yet, please come later...`;
        }

        let result = '';
        for (const product in this.menu) {
            result += `${product} - $ ${this.menu[product].price}\n`
        }

        return result;
    }

    makeTheOrder(mealName) {
        if (!Object.keys(this.menu).includes(mealName)) {
            return `There is not ${mealName} yet in our menu, do you want to order something else?`;
        }

        let haveProductsNeeded = false;
        for (const productToCheck in this.menu[mealName].neededProducts) {
            let productInfo = this.menu[mealName].neededProducts[productToCheck].split(' ');
            let productToCheckName = productInfo[0];
            let productToCheckQuantity = +productInfo[1];

            if (this.productsInStock[productToCheckName] >= productToCheckQuantity) {
                haveProductsNeeded = true;
            }
            else {
                haveProductsNeeded = false;
                break;
            }
        }

        //if we dont have the products
        //if we have it
        if (haveProductsNeeded) {
            for (const productToCheck in this.menu[mealName].neededProducts) {
                let productInfo = this.menu[mealName].neededProducts[productToCheck].split(' ');
                let productToCheckName = productInfo[0];
                let productToCheckQuantity = +productInfo[1];

                this.productsInStock[productToCheckName] -= productToCheckQuantity;
            }

            this.budget += this.menu[mealName].price;
            return `Your order (${mealName}) will be completed in the next 30 minutes and will cost you ${this.menu[mealName].price}.`;
        }
        else {
            return `For the time being, we cannot complete your order (${mealName}), we are very sorry...`;
        }
    }
}


let kitchen = new Kitchen(1000);
kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']);
console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder('Pizza'));