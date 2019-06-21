function acceptance() {
	let addButton = document.getElementById('acceptance');
	addButton.addEventListener('click', onClick);

	function removeProduct() {
		let parent = this.parentNode; // div to remove
		document.getElementById('warehouse').removeChild(parent);
	};

	function onClick() {
		let shippingCompany = document.getElementsByName('shippingCompany')[0].value;
		let productName = document.getElementsByName('productName')[0].value;
		let productQuantity = document.getElementsByName('productQuantity')[0].value;
		let productScrape = document.getElementsByName('productScrape')[0].value;

		if (shippingCompany !== '' && productName !== '' && !isNaN(productQuantity) && !isNaN(productScrape)) {
			if (productQuantity - productScrape > 0) {
				addProduct(shippingCompany, productName, productQuantity, productScrape);

				let removeButtons = [...document.getElementsByTagName('button')];
				removeButtons.forEach((removeButton) => {
					if (removeButton.innerHTML === 'Out of stock') {
						removeButton.addEventListener('click', removeProduct);
					}
				});
			}

			document.getElementsByName('shippingCompany')[0].value = '';
			document.getElementsByName('productName')[0].value = '';
			document.getElementsByName('productQuantity')[0].value = '';
			document.getElementsByName('productScrape')[0].value = '';
		}
	};

	function addProduct(shippingCompany, productName, productQuantity, productScrape) {
		let div = document.createElement('div');
		let p = document.createElement('p');
		let button = document.createElement('button');

		button.textContent = 'Out of stock';
		let pieces = productQuantity - productScrape;
		p.textContent = `[${shippingCompany}] ${productName} - ${pieces} pieces`;

		div.appendChild(p);
		div.appendChild(button);

		let warehouse = document.getElementById('warehouse');
		warehouse.appendChild(div);
	};
}