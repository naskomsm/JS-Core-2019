function notify(message) {
    document.getElementById('notification').style.display = 'block';
    document.getElementById('notification').textContent = message;

    setTimeout(function () {
        document.getElementById('notification').style.display = 'none';
        document.getElementById('notification').textContent = '';
    }, 2000);
}