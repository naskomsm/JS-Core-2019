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
    allStudents: []
}

const authInfo = `Basic ${btoa('guest:guest')}`;

const loadStudents = () => {
    const loadURL = elements.baseURL + `/students`;
    elements.tableBody.innerHTML = 'Loading...';

    fetch(loadURL, {
        method: 'get',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        }
    }).then(handler).then(showStudents);
}

const showStudents = (students) => {
    elements.tableBody.innerHTML = '';
    elements.allStudents = [];

    students.forEach(student => {
        const myObj = {
            'Id': student.Id,
            'FirstName': student.FirstName,
            'LastName': student.LastName,
            'FacultyNumber': student.FacultyNumber,
            'Grade': student.Grade
        }

        elements.allStudents.push(myObj);
    });

    elements.allStudents.sort((a, b) => a.Id - b.Id).forEach(student => {
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

const addStudent = () => {
    const addURL = elements.baseURL + `/students`;

    if (elements.id.value && elements.firstName.value && elements.lastName.value && elements.facultyNumber.value && elements.grade.value) {
        const myObj = {
            'Id': elements.id.value,
            'FirstName': elements.firstName.value,
            'LastName': elements.lastName.value,
            'FacultyNumber': elements.facultyNumber.value,
            'Grade': elements.grade.value
        }

        elements.allStudents.push(myObj);

        fetch(addURL, {
            method: 'post',
            headers: {
                'Authorization': authInfo,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myObj),
        }).then(loadStudents).then(clear);
    }
}

const appendChildren = (parent, children) => {
    children.forEach((child) => {
        parent.appendChild(child);
    });
}

const createHTMLelement = (tagName, textContent, placeholder) => {
    let element = document.createElement(tagName);

    if (textContent) {
        element.textContent = textContent;
    }

    if (placeholder) {
        element.setAttribute('placeholder', placeholder);
    }

    return element;
}

const clear = () => {
    elements.id.value = '';
    elements.firstName.value = '';
    elements.lastName.value = '';
    elements.facultyNumber.value = '';
    elements.grade.value = '';
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
    elements.addButton.addEventListener('click', addStudent);
    elements.loadButton.addEventListener('click', loadStudents);
})();