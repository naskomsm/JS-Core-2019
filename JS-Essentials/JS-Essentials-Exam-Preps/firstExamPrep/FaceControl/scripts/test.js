function getData() {
	let input = JSON.parse(document.getElementsByTagName('textarea')[0].value);
	let lastElement = input.pop(); // criteria: lastName , action: peopleIn

	let table = {
		peopleIn: [],
		peopleOut: [],
		blacklist: []
	};

	for (let person of input) {
		if (person.action === 'peopleIn') {
			let searchedPerson = table.blacklist.find(x => x.firstName === person.firstName && x.lastName === person.lastName);

			if (!searchedPerson) {
				table.peopleIn.push(person);
			}
		}
		else if (person.action === 'peopleOut') {
			let searchedPerson = table.peopleIn.find(x => x.firstName === person.firstName && x.lastName === person.lastName);

			if (searchedPerson) {
				let indexOfSearchedPerson = table.peopleIn.indexOf(searchedPerson);
				table.peopleIn.splice(indexOfSearchedPerson, 1);
				table.peopleOut.push(searchedPerson);
			}
		}
		else if (person.action === 'blacklist') {
			let searchedPerson = table.peopleIn.find(x => x.firstName === person.firstName && x.lastName === person.lastName);

			if (searchedPerson) {
				let indexOfSearchedPerson = table.peopleIn.indexOf(searchedPerson);
				table.peopleIn.splice(indexOfSearchedPerson, 1);
				table.peopleOut.push(searchedPerson);
			}

			table.blacklist.push(person);
		}
	}

	display();
	function display() {
		if (lastElement.action !== '' && lastElement.criteria !== '') {
			table[lastElement.action].sort((a, b) => a[lastElement.criteria].localeCompare(b[lastElement.criteria]));
		}

		for (let person of table.peopleIn) {
			document.querySelector('#peopleIn p').textContent += `{"firstName":"${person.firstName}","lastName":"${person.lastName}"} `;
		}

		for (let person of table.peopleOut) {
			document.querySelector('#peopleOut p').textContent += `{"firstName":"${person.firstName}","lastName":"${person.lastName}"} `;
		}

		for (let person of table.blacklist) {
			document.querySelector('#blacklist p').textContent += `{"firstName":"${person.firstName}","lastName":"${person.lastName}"} `;
		}
	}
}