function coffeeMachine(products) {
    let totalIncome = 0;
    for (let object of products) {
        let product = object.split(', ');
        let price = 0;
        let coins = Number(product[0]); // coins inserted
        let typeOfDrink = product[1]; // coffee or tea

        if(typeOfDrink === 'coffee'){
            let typeOfCoffee = product[2]; // caffeine or decaf
            
            if(typeOfCoffee === 'caffeine'){
                price += 0.80;
            }
            else{
                price += 0.90;
            }

            if(product.length === 5){ // we have milk
                let milkPrice = (price / 10).toFixed(1);
                price += +milkPrice;
                
                let sugar = Number(product[4]);
                if(sugar > 0){
                    price += 0.10;
                }
            }
            else{
                let sugar = Number(product[3]);
                if(sugar > 0){
                    price += 0.10;
                }
            }
        }

        else if (typeOfDrink === 'tea'){
            price += 0.80;

            if(product.length === 4){ // we have milk
                let milkPrice = (price / 10).toFixed(1);
                price += +milkPrice;

                let sugar = Number(product[3]);
                if(sugar > 0){
                    price += 0.10;
                }
            }
            else{
                let sugar = Number(product[2]);
                if(sugar > 0){
                    price += 0.10;
                }
            }
        }

        if(coins >= price){
            totalIncome += price;
            let change = coins - price;
            console.log(`You ordered ${typeOfDrink}. Price: ${price.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
        }
        else{
            let moneyNeeded = price - coins;
            console.log(`Not enough money for ${typeOfDrink}. Need ${moneyNeeded.toFixed(2)}$ more.`);
        }

    }
    console.log(`Income Report: ${totalIncome.toFixed(2)}$`);
}

coffeeMachine(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2','1.00, coffee, decaf, 0']);