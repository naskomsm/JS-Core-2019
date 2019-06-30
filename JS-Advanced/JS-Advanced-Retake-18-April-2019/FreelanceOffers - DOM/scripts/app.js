let loginButton = document.getElementById('loginBtn');
loginButton.addEventListener('click', login);

function login() {
    let username = document.getElementById('username').value;

    //validation
    if (username.length >= 4 && username.length <= 10) {
        console.log('BRO im going to sleep')
    }
}
