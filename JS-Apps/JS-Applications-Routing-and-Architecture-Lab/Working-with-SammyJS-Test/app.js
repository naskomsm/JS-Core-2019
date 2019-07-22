const app = Sammy('#main', function () {
    this.use('Handlebars', 'hbs');

    const authInfo = `Basic ${btoa('guest:guest')}`;

    const loadBook = (context) => {
        const searchedId = context.params.id
        const url = `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH/Books/${searchedId}`;
        fetch(url, {
            method: 'get',
            headers: {
                'Authorization': authInfo,
                'Content-Type': 'application/json'
            }
        }).then(handler).then(showBook);
    }

    const showBook = (books) => {
        if(books.length > 1){
            books.forEach(book => {
                console.log(book);
            });
        }
        else{
            console.log(books);
        }
    }

    const loadBooks = () => {
        const url = `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH/Books/`;
        fetch(url, {
            method: 'get',
            headers: {
                'Authorization': authInfo,
                'Content-Type': 'application/json'
            }
        }).then(handler).then(showBook);
    }

    const handler = (response) => {
        if (response.status >= 400) {
            alert(`Error: ${response.statusText}`);
            return;
        }

        return response.json();
    }

    this.get('#/loadBooks/:id', loadBook);
    this.get('#/loadBooks', loadBooks);
});


$(() => app.run());