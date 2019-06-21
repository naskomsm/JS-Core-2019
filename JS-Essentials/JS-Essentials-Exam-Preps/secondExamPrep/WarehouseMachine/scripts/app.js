function coffeeStorage() {
    let input = JSON.parse(document.getElementsByTagName('textarea')[0].value);
    let [report, inspection] = document.querySelectorAll('div p');

    let products = {};

    for (let object of input) {
        let [command, brand, name, expireDate, quantity] = object.split(', ');

        if (command === 'IN') {
            if (!products.hasOwnProperty(brand)) {
                products[brand] = {};
            }

            if (!products[brand].hasOwnProperty(name)) {
                products[brand][name] = {
                    name,
                    expireDate,
                    quantity
                };
            }

            else {
                if (expireDate > products[brand][name].expireDate) {
                    products[brand][name].expireDate = expireDate;
                    products[brand][name].quantity = quantity;
                }
                else if (expireDate === products[brand][name].expireDate) {
                    products[brand][name].quantity += quantity;
                }
            }
        }

        else if (command === 'OUT') {
            if (products[brand] && products[brand][name] && products[brand][name].expireDate > expireDate && products[brand][name].quantity >= quantity) {
                products[brand][name].quantity -= quantity;
            }
        }

        else if (command === 'REPORT') {
            for (let object in products) {
                report.innerHTML += `${object}:`;

                for (let innerObject in products[object]) {
                    report.innerHTML += ` ${products[object][innerObject].name} - ${products[object][innerObject].expireDate} - ${products[object][innerObject].quantity}.`
                }

                report.innerHTML += '<br>';
            }
        }

        else if (command === 'INSPECTION') {
            for (let object of Object.keys(products).sort((a,b) => a.localeCompare(b))) {
                inspection.innerHTML += `${object}:`;

                for (let innerObject of Object.keys(products[object]).sort((a,b) => products[object][b].quantity - products[object][a].quantity)) {
                    inspection.innerHTML += ` ${products[object][innerObject].name} - ${products[object][innerObject].expireDate} - ${products[object][innerObject].quantity}.`
                }

                inspection.innerHTML += '<br>';
            }
        }
    }
}