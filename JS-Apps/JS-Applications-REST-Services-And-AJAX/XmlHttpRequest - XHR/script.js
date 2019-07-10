let button = document.getElementById('send-btn');
button.addEventListener('click', loadRepos);

function loadRepos() {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let div = document.createElement('div');
            div.textContent = this.responseText;
            document.getElementsByTagName('body')[0].appendChild(div);
            return;
        }
    };

    req.open("GET", "https://api.github.com/users/testnakov/repos", true);
    req.send();
}
