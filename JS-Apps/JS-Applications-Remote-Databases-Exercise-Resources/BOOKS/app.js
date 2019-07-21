const elements = {
    loadBooksBtn: document.getElementById('loadBooks'),
    submitBookBtn: document.getElementById('submit'),
    doneBtn: document.getElementById('done'),
    cancelBtn: document.getElementById('cancel'),
    bookUI: document.getElementsByTagName('tbody')[0],
    titleInput: document.getElementById('title'),
    authorInput: document.getElementById('author'),
    isbnInput: document.getElementById('isbn')
};

const authInfo = `Basic ${btoa('guest:guest')}`;

const loadBooks =  () => {
    elements.bookUI.innerHTML = 'Loading...';
    const url = `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH/Books`;
    fetch(url, {
        method: 'get',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        }
    }).then(handler).then(displayBooks);
};

const displayBooks = (books) => {
    elements.bookUI.innerHTML = '';
    const fragment = document.createDocumentFragment();

    books.forEach(book => {
        const bookTr = document.createElement('tr');

        const titleTd = createHTMLelement('td', book.title);
        const authorTd = createHTMLelement('td', book.author);
        const isbnTd = createHTMLelement('td', book.isbn);

        const buttonsTd = createHTMLelement('td');
        const buttonEdit = createHTMLelement('button', 'Edit');
        const buttonDelete = createHTMLelement('button', 'Delete');

        buttonEdit.addEventListener('click', () => editBook(book._id, book.title, book.author, book.isbn));
        buttonDelete.addEventListener('click', () => deleteBook(book._id));

        appendChildren(buttonsTd, [buttonEdit, buttonDelete]);
        appendChildren(bookTr, [titleTd, authorTd, isbnTd, buttonsTd]);
        fragment.appendChild(bookTr);
    });

    elements.bookUI.appendChild(fragment);
};

const editBook = (id, oldTitle, oldAuthor, oldIsbn) => {
    const formTitle = document.getElementsByTagName('h3')[0];
    formTitle.textContent = 'Change book';

    elements.titleInput.value = oldTitle;
    elements.authorInput.value = oldAuthor;
    elements.isbnInput.value = oldIsbn;

    elements.submitBookBtn.style.display = 'none';
    elements.doneBtn.style.display = 'block';
    elements.cancelBtn.style.display = 'block';

    const editTheBook = (ev) => {
        const url = `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH/Books/${id}`;

        const myObj = {
            'title': elements.titleInput.value,
            'author': elements.authorInput.value,
            'isbn': elements.isbnInput.value
        };

        fetch(url, {
            method: 'put',
            headers: {
                'Authorization': authInfo,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myObj)
        }).then(loadBooks);

        formTitle.textContent = 'FORM';
        elements.submitBookBtn.style.display = 'block';
        elements.doneBtn.style.display = 'none';
        elements.cancelBtn.style.display = 'none';

        elements.titleInput.value = '';
        elements.authorInput.value = '';
        elements.isbnInput.value = '';

        ev.preventDefault();
    };

    const cancelTheBook = (ev) => {
        formTitle.textContent = 'FORM';
        elements.submitBookBtn.style.display = 'block';
        elements.doneBtn.style.display = 'none';
        elements.cancelBtn.style.display = 'none';

        elements.titleInput.value = '';
        elements.authorInput.value = '';
        elements.isbnInput.value = '';

        ev.preventDefault();
    };

    elements.doneBtn.addEventListener('click', editTheBook);
    elements.cancelBtn.addEventListener('click', cancelTheBook);
};

const deleteBook = (id) => {
    const url = `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH/Books/${id}`;
    fetch(url, {
        method: 'delete',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        }
    }).then(loadBooks);
};

const createBook = async function (e) {
    const newBook = {
        'title': elements.titleInput.value,
        'author': elements.authorInput.value,
        'isbn': elements.isbnInput.value
    };

    const url = `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH/Books`;
    fetch(url, {
        method: 'post',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    }).then(handler).then(loadBooks);

    e.preventDefault();
};

const createHTMLelement = (tagName, textContent, placeholder) => {
    let element = document.createElement(tagName);

    if (textContent) {
        element.textContent = textContent;
    }

    if (placeholder) {
        element.setAttribute('placeholder', placeholder);
    }

    return element;
};

const appendChildren = (parent, children) => {
    children.forEach((child) => {
        parent.appendChild(child);
    });
}

const handler = (response) => {
    if (response.status > 400) {
        alert(`Error: ${response.statusText}`);
        return;
    }

    return response.json();
}

(function attachEvents() {
    //Add the event listeners here
    elements.loadBooksBtn.addEventListener('click', loadBooks);
})();