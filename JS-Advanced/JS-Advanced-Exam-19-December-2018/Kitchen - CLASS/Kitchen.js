class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(products) {
        for (const product of products) {
            let [name, quantity, price] = product.split(' ');

            if (this.budget >= +price) {
                if (!this.productsInStock.hasOwnProperty(name)) {
                    this.productsInStock[name] = 0;
                }
                
                this.productsInStock[name] += +quantity;
                this.budget -= +price;
                this.actionsHistory.push(`Successfully loaded ${quantity} ${name}`);
            }
            else {
                this.actionsHistory.push(`There was not enough money to load ${quantity} ${name}`);
            }
        }

        return this.actionsHistory.join('\n');
    }

    addToMenu(mealName, products, price) {
        if (this.menu.hasOwnProperty(mealName)) {
            return `The ${mealName} is already in the our menu, try something different.`;
        }

        this.menu[mealName] = {
            products: products,
            price: +price
        }

        return `Great idea! Now with the ${mealName} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
    }

    showTheMenu() {
        if (Object.keys(this.menu).length === 0) {
            return `Our menu is not ready yet, please come later...`;
        }

        let result = '';
        for (const product in this.menu) {
            result += `${product} - $ ${this.menu[product].price}\n`;
        }

        return result;
    }

    makeTheOrder(mealName) {
        if (!Object.keys(this.menu).includes(mealName)) {
            return `There is not ${mealName} yet in our menu, do you want to order something else?`;
        }

        let neededProducts = this.menu[mealName].products;
        for (const neededProduct of neededProducts) {
            let [name, quantity] = neededProduct.split(' ');

            if (!this.productsInStock.hasOwnProperty(name) || this.productsInStock[name] < +quantity) {
                return `For the time being, we cannot complete your order (${mealName}), we are very sorry...`;
            }

            if (this.productsInStock[name] >= +quantity) {
                this.productsInStock[name] -= +quantity;
                this.budget += this.menu[mealName].price;

                return `Your order (${mealName}) will be completed in the next 30 minutes and will cost you ${this.menu[mealName].price}.`;
            }

            return `For the time being, we cannot complete your order (${mealName}), we are very sorry...`;
        }
    }
}