const authInfo = `Basic ${btoa('guest:guest')}`;
const url = `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH/Books/`;

const loadFirstBook = () => {
    fetch(url, {
        method: 'get',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        }
    }).then(handler).then(showFirstBook);
}

const showFirstBook = (books) => {
    const bookId = '5d3422ea7e910233ed3f50e3';
    const book = books.find(book => book._Id === bookId);
    console.log(book);
}

const handler = (response) => {
    if (response.status >= 400) {
        alert(`Error: ${response.statusText}`);
        return;
    }

    return response.json();
}

const app = Sammy('#main', function () {
    const handleId = () => {
        //todo
    };

    this.get('#/showBooks/:5d3422ea7e910233ed3f50e3', handleId);
});




$(() => app.run());