let loginButton = document.getElementById('loginBtn');
loginButton.addEventListener('click', login);

if (loginButton.innerHTML === 'Login') {
    // not logged state - default
    let createOffersDiv = document.getElementById('create-offers');
    createOffersDiv.style.display = 'none';
    
    function login() {
        createOffersDiv.style.display = 'inline';
        loginButton.innerHTML = 'Logout';
    }
}
else{

}