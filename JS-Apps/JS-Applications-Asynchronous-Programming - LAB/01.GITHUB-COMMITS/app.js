function loadCommits() {
    const elements = {
        username: document.getElementById('username'),
        repository: document.getElementById('repo'),
        button: document.getElementsByTagName('button')[0],
        commits: document.getElementById('commits')
    };

    elements.button.addEventListener('click', loadCommits);

    function loadCommits() {
        const url = `https://api.github.com/repos/${elements.username.value}/${elements.repository.value}/commits`;
        fetch(url)
            .then(handler)
            .then(showCommits);
    }

    function showCommits(data) {
        data.forEach(commit => {
            const name = commit.commit.author.name;
            const message = commit.commit.message;

            updateDOM(name, message);
        });

        clearFields();
    };

    function updateDOM(name, message) {
        let li = document.createElement('li');
        li.textContent = `${name}: ${message}`;

        elements.commits.appendChild(li);
    }

    function clearFields(){
        elements.username.value = '';
        elements.repository.value = '';
    }

    function handler(response) {
        if (response.status > 400) {
            alert(`Error: ${response.statusText}`);
            return;
        }

        return response.json();
    }
}

loadCommits();