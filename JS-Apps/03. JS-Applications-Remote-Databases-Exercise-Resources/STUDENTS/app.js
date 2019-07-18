function students() {
    const elements = {
        usernameAndPasswordEncoded: `Z3Vlc3Q6Z3Vlc3Q=`,
        loadButton: document.getElementsByClassName('load')[0],
        addButton: document.getElementsByClassName('add')[0],
        baseURL: `https://baas.kinvey.com/appdata/kid_HJ6_eU2bH`,
        tableBody: document.getElementsByTagName('tbody')[0]
    }

    elements.loadButton.addEventListener('click', loadStudents);

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + elements.usernameAndPasswordEncoded);
    headers.append('Content-type', 'application/json');

    function loadStudents() {
        const loadURL = elements.baseURL + `/students`;
        elements.tableBody.innerHTML = 'Loading...';

        fetch(loadURL,{
            method: 'get',
            headers: headers
        })
            .then(handler)
            .then(showStudents);
    }

    function showStudents(students){
        elements.tableBody.innerHTML = '';
        students.forEach(student => {
            const tr = createHTMLelement('tr');

            const Idtd = createHTMLelement('td',student.Id);
            const firstNameTd = createHTMLelement('td',student.FirstName);
            const lastNameTd = createHTMLelement('td',student.LastName);
            const facultyNumberTd = createHTMLelement('td',student.FacultyNumber);
            const gradeTd = createHTMLelement('td',student.Grade);

            appendChildren(tr,[Idtd,firstNameTd,lastNameTd,facultyNumberTd,gradeTd]);
            elements.tableBody.appendChild(tr);
        });
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