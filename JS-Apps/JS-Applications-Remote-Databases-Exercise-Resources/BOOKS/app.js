function display() {
    const elements = {
        loadAllBooksButton: document.getElementById('loadBooks'),
        title: document.getElementById('title'),
        author: document.getElementById('author'),
        isbn: document.getElementById('isbn'),
        submitButton: document.getElementById('submit'),
        baseURL: `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH`,
        books: document.getElementsByTagName('tbody')[0],
        changeSettings: document.getElementById('addForm'),
        saveBtn: document.getElementById('addForm').children[8],
        cancelBtn: document.getElementById('addForm').children[9],
        username: 'guest',
        password: 'guest'
    };

    elements.changeSettings.style.display = 'none';
    elements.submitButton.addEventListener('click', submitBook);
    elements.loadAllBooksButton.addEventListener('click', loadAllBooks);

    function submitBook(e) {
        const createURL = elements.baseURL + '/Books';

        let base_64 = btoa(elements.username + ':' + elements.password);
        const auth = {
            'Authorization': 'Basic ' + base_64,
            'Content-type': 'application/json'
        };

        if (elements.title.value && elements.author.value && elements.isbn.value) {
            const obj = {
                "title": elements.title.value,
                "author": elements.author.value,
                "isbn": elements.isbn.value
            };

            fetch(createURL, {
                method: 'post',
                headers: auth,
                body: JSON.stringify(obj)
            }).then(handler).then(loadAllBooks);
        }

        clear();
        e.preventDefault();
    }

    function loadAllBooks() {
        elements.books.innerHTML = 'Loading....';
        const booksURL = elements.baseURL + '/Books';

        let base_64 = btoa(elements.username + ':' + elements.password);
        const auth = {
            'Authorization': 'Basic ' + base_64,
            'Content-type': 'application/json'
        };

        fetch(booksURL, {
            method: 'get',
            headers: auth
        })
            .then(handler)
            .then(showAllBooks);
    }

    function showAllBooks(data) {
        elements.books.innerHTML = '';
        if (data.length > 0) {
            data.forEach(book => {
                updateDOM(book.title, book.author, book.isbn, book._id);
            });
        }
    }

    function updateDOM(title, author, isbn, id) {
        const bookTr = createHTMLelement('tr');

        let titleTd = createHTMLelement('td', title);
        const authorTd = createHTMLelement('td', author);
        const isbnTd = createHTMLelement('td', isbn);

        const buttonsTd = createHTMLelement('td');
        const buttonEdit = createHTMLelement('button', 'Edit');
        const buttonDelete = createHTMLelement('button', 'Delete');
        buttonEdit.addEventListener('click', editBook);
        buttonDelete.addEventListener('click', deleteBook);

        function deleteBook() {
            const deleteURL = elements.baseURL + `/Books/${id}`;

            let base_64 = btoa(elements.username + ':' + elements.password);
            const auth = {
                'Authorization': 'Basic ' + base_64,
                'Content-type': 'application/json'
            };

            fetch(deleteURL, {
                method: 'delete',
                headers: auth
            }).then(loadAllBooks);
        }

        function editBook() {
            if (elements.changeSettings.style.display == 'none') {
                elements.changeSettings.style.display = 'block';

                elements.saveBtn.addEventListener('click', save);
                function save() {
                    let newTitle = document.getElementsByClassName('newTitle')[0];
                    let newAuthor = document.getElementsByClassName('newAuthor')[0];
                    let newIsbn = document.getElementsByClassName('newIsbn')[0];

                    let base_64 = btoa(elements.username + ':' + elements.password);
                    const auth = {
                        'Authorization': 'Basic ' + base_64,
                        'Content-type': 'application/json'
                    };

                    if (newTitle.value || newAuthor.value || newIsbn.value) {
                        const myObj = {
                            "title": newTitle.value || title,
                            "author": newAuthor.value || author,
                            "isbn": newIsbn.value || isbn
                        };

                        const editURL = elements.baseURL + `/Books/${id}`;
                        fetch(editURL, {
                            method: 'put',
                            headers: auth,
                            body: JSON.stringify(myObj)
                        }).then(loadAllBooks);

                        newTitle.value = '';
                        newAuthor.value = '';
                        newIsbn.value = '';
                    }

                    elements.changeSettings.style.display = 'none';
                }

                elements.cancelBtn.addEventListener('click', cancel);
                function cancel() {
                    elements.changeSettings.style.display = 'none';
                }
            }
        }


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