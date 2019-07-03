function solution() {
	let toyTypeInput = document.getElementById('toyType');
	let toyPriceInput = document.getElementById('toyPrice');
	let toyDescriptionInput = document.getElementById('toyDescription');

	let addButton = document.getElementsByTagName('button')[0];
	addButton.addEventListener('click', addGift);

	function addGift() {
		if (toyTypeInput.value !== '' && typeof +toyPriceInput.value === 'number' && toyDescriptionInput.value !== '') {
			let gift = createGift();
			let section = document.getElementById('christmasGiftShop');
			section.appendChild(gift);

			function createGift() {
				let div = document.createElement('div');
				div.classList.add('gift');

				let img = document.createElement('img');
				img.src = 'gift.png';

				let h2 = document.createElement('h2');
				h2.innerHTML = toyTypeInput.value;

				let p = document.createElement('p');
				p.innerHTML = toyDescriptionInput.value;

				let buyButton = document.createElement('button');
				buyButton.innerHTML = `Buy it for $${toyPriceInput.value}`
				buyButton.addEventListener('click', () => div.remove());

				div.appendChild(img);
				div.appendChild(h2);
				div.appendChild(p);
				div.appendChild(buyButton);

				return div
			}

			toyTypeInput.value = '';
			toyPriceInput.value = '';
			toyDescriptionInput.value = '';
		}
	}
}