function students() {
    const elements = {
        loadButton: document.getElementsByClassName('load')[0],
        addButton: document.getElementsByClassName('add')[0],
        baseURL: `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH`,
        tableBody: document.getElementsByTagName('tbody')[0],
        id: document.getElementsByClassName('id')[0],
        firstName: document.getElementsByClassName('firstName')[0],
        lastName: document.getElementsByClassName('lastName')[0],
        facultyNumber: document.getElementsByClassName('facultyNumber')[0],
        grade: document.getElementsByClassName('grade')[0],
        username: 'guest',
        password: 'guest'
    }

    let allStudents = [];

    elements.addButton.addEventListener('click', addStudent);
    elements.loadButton.addEventListener('click', loadStudents);

    let base_64 = btoa(elements.username + ':' + elements.password);
    const auth = {
        'Authorization': "Basic " + base_64,
        "Content-type": "application/json"
    };

    function loadStudents() {
        const loadURL = elements.baseURL + `/students`;
        elements.tableBody.innerHTML = 'Loading...';

        fetch(loadURL, {
            method: 'get',
            headers: auth
        })
            .then(handler)
            .then(showStudents);
    }

    function showStudents(students) {
        elements.tableBody.innerHTML = '';
        allStudents = [];

        students.forEach(student => {
            const myObj = {
                'Id': student.Id,
                'FirstName': student.FirstName,
                'LastName': student.LastName,
                'FacultyNumber': student.FacultyNumber,
                'Grade': student.Grade
            }

            allStudents.push(myObj);
        });

        allStudents.sort((a,b) => a.Id - b.Id).forEach(student => {
            const tr = createHTMLelement('tr');
            
            const Idtd = createHTMLelement('td', student.Id);
            const firstNameTd = createHTMLelement('td', student.FirstName);
            const lastNameTd = createHTMLelement('td', student.LastName);
            const facultyNumberTd = createHTMLelement('td', student.FacultyNumber);
            const gradeTd = createHTMLelement('td', student.Grade);

            appendChildren(tr, [Idtd, firstNameTd, lastNameTd, facultyNumberTd, gradeTd]);
            elements.tableBody.appendChild(tr);
        });
    }

    function addStudent() {
        const addURL = elements.baseURL + `/students`;

        if (elements.id.value && elements.firstName.value && elements.lastName.value && elements.facultyNumber.value && elements.grade.value) {
            const myObj = {
                'Id': elements.id.value,
                'FirstName': elements.firstName.value,
                'LastName': elements.lastName.value,
                'FacultyNumber': elements.facultyNumber.value,
                'Grade': elements.grade.value
            }

            allStudents.push(myObj);

            fetch(addURL, {
                method: 'post',
                headers: auth,
                body: JSON.stringify(myObj),
            }).then(loadStudents);

            clear();
        }
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
        elements.id.value = '';
        elements.firstName.value = '';
        elements.lastName.value = '';
        elements.facultyNumber.value = '';
        elements.grade.value = '';
    }

    function handler(response) {
        if (response.status > 400) {
            alert(`Error: ${response.statusText}`);
            return;
        }

        return response.json();
    }
}

students();