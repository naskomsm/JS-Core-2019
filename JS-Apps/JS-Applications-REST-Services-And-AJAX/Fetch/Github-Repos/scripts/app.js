function loadRepos() {
	const repos = document.getElementById("repos");
	repos.innerHTML = '';
	const username = document.getElementById("username").value;
	const url = `https://api.github.com/users/${username}/repos`;

	function createRepo(name,link) {
		let li = document.createElement('li');
		let a = document.createElement('a');

		a.href = link;
		a.innerHTML = name;

		li.appendChild(a);
		return li;
	}

	function displayRepos(repoItems) {
		repoItems.forEach(repo => {
			const { full_name, html_url } = repo;
			const repoItem = createRepo(full_name, html_url);
			repos.appendChild(repoItem);
		});
	}


	function displayError(err) {
		const listItem = document.createElement('li'); 
		listItem.textContent = err;
		repos.appendChild(listItem);
	}


	fetch(url)
		.then((response) => response.json())
		.then((data) => displayRepos(data))
		.catch((err) => displayError(err))
}  