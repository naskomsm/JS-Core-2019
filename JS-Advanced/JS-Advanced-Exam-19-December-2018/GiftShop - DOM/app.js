function solution() {
	let toyTypeInput = document.getElementById('toyType');
	let toyType = toyTypeInput.value;

	let toyPriceInput = document.getElementById('toyPrice');
	let toyPrice = toyPriceInput.value;

	let toyDescriptionInput = document.getElementById('toyDescription');
	let toyDescription = toyDescriptionInput.value;

	if (toyType && !isNaN(toyPrice) && toyDescription.length > 0 && toyDescription.length <= 50) {
		let div = document.createElement('div');
		div.className = 'gift';

		let img = document.createElement('img');
		img.src = 'gift.png';

		let h2 = document.createElement('h2');
		h2.textContent = toyType;

		let p = document.createElement('p');
		p.textContent = toyDescription

		let buyButton = document.createElement('button');
		buyButton.textContent = `Buy it for $${toyPriceInput.value}`
		buyButton.addEventListener('click', () => div.remove());

		div.appendChild(img);
		div.appendChild(h2);
		div.appendChild(p);
		div.appendChild(buyButton);

		document.getElementById('christmasGiftShop').appendChild(div);
	}

	toyTypeInput.value = '';
	toyPriceInput.value = '';
	toyDescriptionInput.value = '';
}
