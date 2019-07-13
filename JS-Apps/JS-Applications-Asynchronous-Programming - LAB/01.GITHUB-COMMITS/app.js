function loadCommits() {
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let commits = document.getElementById('commits');
    commits.innerHTML = '';

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                displayError(response);
            }
        })
        .then(data => display(data))

    function display(data) {

        for (const commit in data) {
            let name = data[commit].commit.author.name;
            let message = data[commit].commit.message

            appenToDOM(name, message);
        }
    }

    function appenToDOM(name, message) {
        let li = document.createElement('li');
        li.textContent = `${name}: ${message}`;
        commits.appendChild(li);
    }

    function displayError(error) {
        let li = document.createElement('li');
        li.textContent = `Error: ${error.status} (${error.statusText})`;
        commits.appendChild(li);
    }
}