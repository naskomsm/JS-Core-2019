function attachEvents() {
    const elements = {
        loadBtn: document.querySelector('button.load'),
        createBtn: document.querySelector('button.add'),
        catches: document.getElementById('catches'),
        anglerInputField: document.querySelector('html body aside fieldset#addForm input.angler'),
        weightInputField: document.querySelector('html body aside fieldset#addForm input.weight'),
        speciesInputField: document.querySelector('html body aside fieldset#addForm input.species'),
        locationInputField: document.querySelector('html body aside fieldset#addForm input.location'),
        baitInputField: document.querySelector('html body aside fieldset#addForm input.bait'),
        captureTimeInputField: document.querySelector('html body aside fieldset#addForm input.captureTime'),
    };

    elements.loadBtn.addEventListener('click', loadCatches);
    elements.createBtn.addEventListener('click', createCatch);

    function createCatch() {
        const obj = {
            'angler': elements.anglerInputField.value,
            'weight': elements.weightInputField.value,
            'species': elements.speciesInputField.value,
            'location': elements.locationInputField.value,
            'bait': elements.baitInputField.value,
            'captureTime': elements.captureTimeInputField.value
        };

        fetch(`https://fisher-game.firebaseio.com/catches.json`, {
            method: 'POST',
            body: JSON.stringify(obj)
        }).then(loadCatches);
    }

    function loadCatches() {
        elements.catches.innerHTML = '';
        fetch(`https://fisher-game.firebaseio.com/catches.json`)
            .then(handler)
            .then(showCatches);
    }

    function showCatches(data) {
        for (const id in data) {
            let currentCatch = data[id];
            appendCatchToDOM(currentCatch.angler, currentCatch.bait, currentCatch.captureTime, currentCatch.location, currentCatch.species, currentCatch.weight, id);
        }
    }

    function appendCatchToDOM(angler, bait, captureTime, location, species, weight, id) {
        const divWrapper = createHTMLelement('div', 'catch', null, { name: 'data-id', value: id });

        const anglerLabel = createHTMLelement('label', null, 'Angler', undefined);
        const anglerInput = createHTMLelement('input', 'angler', angler, { name: 'type', value: 'text' }, angler);
        const anglerHr = createHTMLelement('hr');
        appendChilds(divWrapper, [anglerLabel, anglerInput, anglerHr]);

        const weightLabel = createHTMLelement('label', null, 'Weight', undefined);
        const weightInput = createHTMLelement('input', 'weight', weight, { name: 'type', value: 'number' }, weight);
        const weightHr = createHTMLelement('hr');
        appendChilds(divWrapper, [weightLabel, weightInput, weightHr]);

        const speciesLabel = createHTMLelement('label', null, 'Species', undefined);
        const speciesInput = createHTMLelement('input', 'species', species, { name: 'type', value: 'text' }, species);
        const speciesHr = createHTMLelement('hr');
        appendChilds(divWrapper, [speciesLabel, speciesInput, speciesHr]);

        const locationLabel = createHTMLelement('label', null, 'Location', undefined);
        const locationInput = createHTMLelement('input', 'location', location, { name: 'type', value: 'text' }, location);
        const locationHr = createHTMLelement('hr');
        appendChilds(divWrapper, [locationLabel, locationInput, locationHr]);

        const baitLabel = createHTMLelement('label', null, 'Bait', undefined);
        const baitInput = createHTMLelement('input', 'bait', bait, { name: 'type', value: 'text' }, bait);
        const baitHr = createHTMLelement('hr');
        appendChilds(divWrapper, [baitLabel, baitInput, baitHr]);

        const captureTimeLabel = createHTMLelement('label', null, 'Capture Time', undefined);
        const captureTimeInput = createHTMLelement('input', 'captureTime', captureTime, { name: 'type', value: 'number' }, captureTime);
        const captureTimeHr = createHTMLelement('hr');
        appendChilds(divWrapper, [captureTimeLabel, captureTimeInput, captureTimeHr]);

        const updateButton = createHTMLelement('button', 'update', 'Update');
        const deleteButton = createHTMLelement('button', 'delete', 'Delete');
        updateButton.addEventListener('click', updateCatch);
        deleteButton.addEventListener('click', deleteCatch);
        appendChilds(divWrapper, [updateButton, deleteButton]);

        function updateCatch() {
            const inputs = [...this.parentNode.children].filter(x => x.tagName === 'INPUT');

            const obj = {
                'angler': inputs[0].value,
                'weight': inputs[1].value,
                'species': inputs[2].value,
                'location': inputs[3].value,
                'bait': inputs[4].value,
                'captureTime': inputs[5].value
            };

            fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, {
                method: 'PUT',
                body: JSON.stringify(obj)
            }).then(loadCatches);
        }

        function deleteCatch() {
            fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, {
                method: 'DELETE'
            }).then(loadCatches);
        }

        elements.catches.appendChild(divWrapper);
    }

    function appendChilds(parent, childrenToAppend) {
        childrenToAppend.forEach(child => {
            parent.appendChild(child);
        });
    }

    function createHTMLelement(tagName, className, textContent, attribute, value) { // attribute is object
        let currentElement = document.createElement(tagName);

        if (className) {
            if (typeof className === 'string') {
                currentElement.classList.add(className);
            }
            else if (typeof className === 'object') {
                if (className !== null) {
                    currentElement.classList.add(...className);
                }
            }
        }

        if (textContent) {
            currentElement.textContent = textContent;
        }

        if (attribute) {
            currentElement.setAttribute(attribute.name, attribute.value);
        }

        if (value) {
            currentElement.value = value;
        }

        return currentElement;
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