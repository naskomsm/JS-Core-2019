function solve() {
    const information = [
        {
            id: 1,
            name: 'Atanas',
            age: 18
        },
        {
            id: 2,
            name: 'Ivan',
            age: 19
        }
    ];

    const elements = {
        atanasbutton: document.getElementsByTagName('button')[0],
        ivanButton: document.getElementsByTagName('button')[1],
        output: document.getElementsByTagName('div')[1]
    }

    const showPerson = (id) => {
        const person = information.find(person => person.id === id);

        if (person) {
            elements.output.innerHTML = `
            <h1> Name: ${person.name}
            <h1> Age: ${person.age}
            `;
        }
    };

    elements.atanasbutton.addEventListener('click', () => {
        const id = 1;

        history.pushState({ id }, '', `#/person/${id}`);
        showPerson(id);
    });

    elements.ivanButton.addEventListener('click', () => {
        const id = 2;

        history.pushState({ id }, '', `#/person/${id}`);
        showPerson(id);
    });

    window.addEventListener('popstate', (event) => {
        const { state } = event;

        if(!state){
            elements.output.innerHTML = 'I dont have where to go! I dont have state :(';
        }

        const { id } = state;

        showPerson(id);
    });
}

solve();