function display() {
    const elements = {
        loadAllBooksButton: document.getElementById('loadBooks'),
        title: document.getElementById('title'),
        author: document.getElementById('author'),
        isbn: document.getElementById('isbn'),
        submitButton: document.getElementById('submit'),
        baseURL: `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH`,
        usernameAndPasswordEncoded: `Z3Vlc3Q6Z3Vlc3Q=`,
        books: document.getElementsByTagName('tbody')[0]
    };

    elements.submitButton.addEventListener('click', submitBook);
    elements.loadAllBooksButton.addEventListener('click', loadAllBooks);

    function submitBook(e) {
        const createURL = elements.baseURL + '/Books';

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + elements.usernameAndPasswordEncoded);
        headers.append('Content-type', 'application/json');

        if (elements.title.value && elements.author.value && elements.isbn.value) {
            const obj = {
                "title": elements.title.value,
                "author": elements.author.value,
                "isbn": elements.isbn.value
            };

            fetch(createURL, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(obj)
            }).then(handler).then(loadAllBooks);
        }

        clear();
        e.preventDefault();
    }

    function loadAllBooks() {
        elements.books.innerHTML = 'Loading....';
        const booksURL = elements.baseURL + '/Books';

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + elements.usernameAndPasswordEncoded);

        fetch(booksURL, {
            method: 'get',
            headers: headers
        })
            .then(handler)
            .then(showAllBooks);
    }

    function showAllBooks(data) {
        elements.books.innerHTML = '';
        data.forEach(book => {
            updateDOM(book.title, book.author, book.isbn, book._id);
        });
    }

    function updateDOM(title, author, isbn, id) {
        const bookTr = createHTMLelement('tr');

        const titleTd = createHTMLelement('td', title);
        const authorTd = createHTMLelement('td', author);
        const isbnTd = createHTMLelement('td', isbn);

        const buttonsTd = createHTMLelement('td');
        const buttonEdit = createHTMLelement('button', 'Edit');
        const buttonDelete = createHTMLelement('button', 'Delete');
        buttonEdit.addEventListener('click', editBook);
        buttonDelete.addEventListener('click', deleteBook);

        function deleteBook() {
            if (buttonDelete.textContent === 'Delete') {
                bookTr.remove();

                const deleteURL = elements.baseURL + `/Books/${id}`;

                let headers = new Headers();
                headers.append('Authorization', 'Basic ' + elements.usernameAndPasswordEncoded);
                headers.append('Content-type', 'application/json');

                fetch(deleteURL, {
                    method: 'delete',
                    headers: headers
                }).then(handler).then(loadAllBooks);
            }
            else {
                buttonEdit.textContent = 'Edit';
                buttonDelete.textContent = 'Delete';

                const title = document.querySelector('body > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > input:nth-child(6)');
                const author = document.querySelector('body > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > input:nth-child(8)');
                const isbn = document.querySelector('body > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > input:nth-child(10)');

                title.remove();
                author.remove();
                isbn.remove();

                loadAllBooks();
            }
        };

        function editBook() {
            if (buttonEdit.textContent === 'Edit') {
                buttonEdit.textContent = 'Save';
                buttonDelete.textContent = 'Cancel';

                let titleH1 = createHTMLelement('h1', 'title');
                let titleInput = createHTMLelement('input', bookTr.children[0].textContent);

                let authorH1 = createHTMLelement('h1', 'author');
                let authorInput = createHTMLelement('input', bookTr.children[1].textContent);

                let isbnH1 = createHTMLelement('h1', 'isbn');
                let isbnInput = createHTMLelement('input', bookTr.children[2].textContent);

                appendChildren(bookTr, [titleH1, titleInput, authorH1, authorInput, isbnH1, isbnInput]);
            }
            else {
                buttonEdit.textContent = 'Edit';
                buttonDelete.textContent = 'Delete';

                const putURL = elements.baseURL + `/Books/${id}`;

                let headers = new Headers();
                headers.append('Authorization', 'Basic ' + elements.usernameAndPasswordEncoded);
                headers.append('Content-type', 'application/json');

                let currentTitle = bookTr.children[5];
                let currentAuthor = bookTr.children[7];
                let currentIsbn = bookTr.children[9];

                if (currentTitle.value == '') currentTitle.value = title;
                if (currentAuthor.value == '') currentAuthor.value = author;
                if (currentIsbn.value == '') currentIsbn.value = isbn;

                const obj = {
                    "title": currentTitle.value,
                    "author": currentAuthor.value,
                    "isbn": currentIsbn.value
                };

                fetch(putURL, {
                    method: 'put',
                    headers: headers,
                    body: JSON.stringify(obj)
                }).then(handler).then(loadAllBooks);

                currentTitle.remove();
                currentAuthor.remove();
                currentIsbn.remove();
            }
        };

        appendChildren(buttonsTd, [buttonEdit, buttonDelete]);
        appendChildren(bookTr, [titleTd, authorTd, isbnTd, buttonsTd]);
        elements.books.appendChild(bookTr);
    }

    function appendChildren(parent, children) {
        children.forEach((child) => {
            parent.appendChild(child);
        });
    }

    function createHTMLelement(tagName, textContent, placeholder) {
        let element = document.createElement(tagName);

        if (textContent) {
            element.textContent = textContent;
        }

        if (placeholder) {
            element.setAttribute('placeholder', placeholder);
        }

        return element;
    }

    function clear() {
        elements.title.value = '';
        elements.author.value = '';
        elements.isbn.value = '';
    }

    function handler(response) {
        if (response.status > 400) {
            alert(`Error: ${response.statusText}`);
            return;
        }

        return response.json();
    }
}

display();