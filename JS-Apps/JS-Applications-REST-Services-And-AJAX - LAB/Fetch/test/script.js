let button = document.getElementById('send-btn');
button.addEventListener('click', loadRepos);

function loadRepos() {
    // GET
    fetch('https://swapi.co/api/people/4')
    .then((response) => response.json())
    .then((data) => appendToBody(JSON.stringify(data)))
    .catch((error) => console.error(error))

    function appendToBody(data){
        let div = document.createElement('div');
        div.textContent = data;
        document.getElementsByTagName('body')[0].appendChild(div);
    }


    // POST
    let data = '{ "name":"Atanas Kolev" }';
    fetch('https://swapi.co/api/people', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
      });
}
