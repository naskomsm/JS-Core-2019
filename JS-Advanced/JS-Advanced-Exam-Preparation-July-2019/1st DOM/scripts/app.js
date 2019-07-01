function acceptance() {
	let addButton = document.getElementById('acceptance');
	addButton.addEventListener('click', addProduct);

	function addProduct() {
		let shippingCompany = document.getElementsByName('shippingCompany')[0].value;
		let productName = document.getElementsByName('productName')[0].value;
		let productQuantity = +document.getElementsByName('productQuantity')[0].value;
		let productScrape = +document.getElementsByName('productScrape')[0].value;

		if (shippingCompany !== '' && productName !== '' && !isNaN(productQuantity) && !isNaN(productScrape)) {
			if (productQuantity - productScrape > 0) {
				let warehouse = document.getElementById('warehouse');

				let product = createProduct(shippingCompany, productName, productQuantity, productScrape);
				warehouse.appendChild(product);

				resetValues();
			}
		}
	}

	function resetValues() {
		document.getElementsByName('shippingCompany')[0].value = '';
		document.getElementsByName('productName')[0].value = '';
		document.getElementsByName('productQuantity')[0].value = '';
		document.getElementsByName('productScrape')[0].value = '';
	}

	function createProduct(shippingCompany, productName, productQuantity, productScrape) {
		let div = document.createElement('div');
		let p = document.createElement('p');

		let outOfStockButton = document.createElement('button');
		outOfStockButton.innerHTML = `Out of stock`;
		outOfStockButton.addEventListener('click', () => div.remove());

		p.innerHTML = `[${shippingCompany}] ${productName} - ${productQuantity - productScrape} pieces`;

		div.appendChild(p);
		div.appendChild(outOfStockButton);

		return div;
	}
}