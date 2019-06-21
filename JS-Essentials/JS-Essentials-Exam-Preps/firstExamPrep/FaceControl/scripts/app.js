function getData() {
	const allPeople = JSON.parse(document.querySelector('textarea').value); //all data as objects
	const sortCondition = allPeople.pop();

	let peopleIn = []; //as obj
	let peopleOut = []; //as obj
	let blacklist = []; //as obj

	allPeople.forEach(person => {
		if (person.action === 'peopleIn') {
			if (!blacklist.find(p => p.firstName === person.firstName && p.lastName === person.lastName)) {
				peopleIn.push(person);
			}
		} else if (person.action === 'peopleOut') {
			const personFound = peopleIn.find(p => p.firstName === person.firstName && p.lastName === person.lastName);

			if (personFound) {
				const index = peopleIn.indexOf(personFound);
				peopleIn.splice(index, 1);
				peopleOut.push(person);
			}
		} else if (person.action === 'blacklist'){	//blacklist
			blacklist.push(person);
			const personFound = peopleIn.find(p => p.firstName === person.firstName && p.lastName === person.lastName);
			
			if (personFound) {
				const index = peopleIn.indexOf(personFound);
				peopleIn.splice(index, 1);
				peopleOut.push(person);
			}
		}
	});

	let allPeopleObj = { peopleIn, peopleOut, blacklist };

	if (sortCondition.criteria && sortCondition.action) {
		allPeopleObj[sortCondition.action]
			.sort((a, b) => a[sortCondition.criteria].localeCompare(b[sortCondition.criteria]))
	}

	for (const action in allPeopleObj) {
		allPeopleObj[action] = allPeopleObj[action].map(person => JSON.stringify({firstName: person.firstName, lastName: person.lastName}));
	}
		
	document.querySelector('#peopleIn p').textContent = allPeopleObj.peopleIn.join(' ');
	document.querySelector('#peopleOut p').textContent = allPeopleObj.peopleOut.join(' ');
	document.querySelector('#blacklist p').textContent = allPeopleObj.blacklist.join(' ');
}