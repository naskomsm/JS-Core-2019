function display() {
    const elements = {
        loadAllBooksButton: document.getElementById('loadBooks'),
        title: document.getElementById('title'),
        author: document.getElementById('author'),
        isbn: document.getElementById('isbn'),
        submitButton: document.getElementById('submit'),
        baseURL: `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH`,
        usernameAndPasswordEncoded: `Z3Vlc3Q6Z3Vlc3Q=`,
        books: document.getElementsByTagName('tbody')[0],
        changeSettings: document.getElementById('addForm'),
        saveBtn: document.getElementById('addForm').children[8],
        cancelBtn: document.getElementById('addForm').children[9],
    };

    elements.changeSettings.style.display = 'none';
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

           let headers = new Headers();
           headers.append('Authorization', 'Basic ' + elements.usernameAndPasswordEncoded);

           fetch(deleteURL,{
                method: 'delete',
                headers: headers
           }).then(loadAllBooks);
        }

        function editBook() {
            if(elements.changeSettings.style.display == 'none'){
                elements.changeSettings.style.display = 'block';

                elements.saveBtn.addEventListener('click',save);
                function save(){
                    const newTitle = document.getElementsByClassName('newTitle')[0];
                    const newAuthor = document.getElementsByClassName('newAuthor')[0];
                    const newIsbn = document.getElementsByClassName('newIsbn')[0];

                    
                    let headers = new Headers();
                    headers.append('Authorization', 'Basic ' + elements.usernameAndPasswordEncoded);
                    headers.append('Content-type', 'application/json');
                    
                    if(newTitle.value || newAuthor.value || newIsbn.value){
                        const myObj = {
                            "title": newTitle.value,
                            "author": newAuthor.value,
                            "isbn": newIsbn.value
                        };

                        const editURL = elements.baseURL + `/Books/${id}`;
                        fetch(editURL,{
                            method: 'put',
                            headers: headers,
                            body: JSON.stringify(myObj)
                        }).then(loadAllBooks);
                    }

                    elements.changeSettings.style.display = 'none';
                }

                elements.cancelBtn.addEventListener('click',cancel);
                function cancel(){
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