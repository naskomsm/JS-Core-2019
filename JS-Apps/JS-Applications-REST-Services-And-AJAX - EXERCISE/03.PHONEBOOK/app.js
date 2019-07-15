function attachEvents() {
    const elements = {
        loadButton: document.getElementById('btnLoad'),
        createButton: document.getElementById('btnCreate'),
        phonebook: document.getElementById('phonebook')
    };

    elements.loadButton.addEventListener('click', loadContacts);

    function loadContacts() {
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then(handler)
            .then(showContacts);
    }

    function showContacts(data) {
        for (const contact in data) {
            const id = contact;
            const { person, phone } = data[contact];
            
            const li = createLi(person, phone,id);
            elements.phonebook.appendChild(li);
        }
    }
    
    function createLi(person, phone,id) {
        const deleteButton = createDeleteButton();
        let li = document.createElement('li');
        li.textContent = `${person}: ${phone}`;
        li.appendChild(deleteButton);

        return li;
    }

    function createDeleteButton() {
        let button = document.createElement('button');
        button.textContent = 'DELETE';
        button.addEventListener('click',deleteContact);

        return button;
    }

    function deleteContact(id) {

    }

    function handler(response) {
        if (response.status > 400) {
            alert(`Error: ${response.statusText}`);
            return;
        }

        return response.json();
    }
}

attachEvents();