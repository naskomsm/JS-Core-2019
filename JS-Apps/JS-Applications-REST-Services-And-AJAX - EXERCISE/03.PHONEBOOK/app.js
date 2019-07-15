function attachEvents() {
    const elements = {
        loadButton: document.getElementById('btnLoad'),
        createButton: document.getElementById('btnCreate'),
        phonebook: document.getElementById('phonebook'),
        personName: document.getElementById('person'),
        personPhone: document.getElementById('phone')
    };

    elements.createButton.addEventListener('click', createContact);
    elements.loadButton.addEventListener('click', loadContacts);

    function loadContacts() {
        elements.phonebook.innerHTML = '';
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then(handler)
            .then(showContacts);
    }

    function showContacts(data) {
        for (const contact in data) {
            const id = contact;
            const { person, phone } = data[contact];

            const li = createLi(person, phone, id);
            elements.phonebook.appendChild(li);
        }
    }

    function createLi(person, phone, id) {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.addEventListener('click', deleteContact);

        let li = document.createElement('li');
        li.textContent = `${person}: ${phone}`;
        li.appendChild(deleteButton);

        function deleteContact() {
            const contactToRemove = this.parentNode;

            fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`, {
                method: 'DELETE'
            })
                .then(() => contactToRemove.remove())
                .then(loadContacts);
        }

        return li;
    }

    function createContact() {
        const contact = {
            'person': elements.personName.value,
            'phone': elements.personPhone.value
        };

        elements.personName.value = '';
        elements.personPhone.value = '';

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`, {
            method: 'POST',
            body: JSON.stringify(contact)
        }).then(loadContacts);
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