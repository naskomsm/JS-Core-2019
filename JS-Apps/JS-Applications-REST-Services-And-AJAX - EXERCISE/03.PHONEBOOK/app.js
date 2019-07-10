function attachEvents() {
    //buttons    
    let loadButton = document.getElementById('btnLoad');
    loadButton.addEventListener('click', loadContacts);

    let createButton = document.getElementById('btnCreate');
    createButton.addEventListener('click', createContact);

    let phonebook = document.getElementById('phonebook');


    function loadContacts() {
        function display(contacts) {
            for (const contact in contacts) {
                const { person, phone } = contacts[contact];
                const key = contact;
                appendToDom(person, phone, key);
            }
        }

        function appendToDom(person, phone, key) {
            let li = document.createElement('li');
            li.textContent = `${person}: ${phone}`;
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'DELETE';

            deleteButton.addEventListener('click', deleteContact);
            //todo removeContact - FETCH FOR DELETE
            let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`
            function deleteContact() {
                fetch(deleteUrl, {
                    method: 'DELETE'
                });
            }

            li.appendChild(deleteButton);

            phonebook.appendChild(li);
        }

        let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
        fetch(url)
            .then((response) => response.json())
            .then((data) => display(data))
    }


    //todo createContact - FETCH FOR POST
    function createContact() {
        let person = document.getElementById('person').value;
        let phone = document.getElementById('phone').value; 

        let myObj = {
            "person": person,
            "phone": phone
        }

        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', {
            method: 'post',
            body: JSON.stringify(myObj),
        }).then(response => response.json());
    }
}

attachEvents();