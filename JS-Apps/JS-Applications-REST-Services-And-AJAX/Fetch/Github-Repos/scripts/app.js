function loadRepos() {
	let username = document.getElementById('username').value;
	let reposList = document.getElementById('repos');

	function parseRepo({ html_url, full_name }) {
		return { link: html_url, name: full_name };
	}

	function toDomElement({ name, link }) {
		let listItem = document.createElement('li');
		let linkItem = document.createElement('a');

		linkItem.href = link;
		linkItem.innerHTML = name;
		listItem.appendChild(linkItem);
		return listItem;
	}

	fetch(`https://api.github.com/users/${username}/repos`)
		.then(response => response.json())
		.then(repos =>
			repos.map(parseRepo)
				.map(toDomElement)
				.forEach(el => {
					reposList.appendChild(el);
				}))
		.catch((error) => console.error(error))

}