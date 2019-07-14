function attachEvents() {
    let addButton = document.getElementsByClassName('add')[0];
    addButton.addEventListener('click', addCatch);

    function addCatch() {
        let angler = document.querySelector('html body aside fieldset#addForm input.angler').value;
        let weight = document.querySelector('html body aside fieldset#addForm input.weight').value;
        let species = document.querySelector('html body aside fieldset#addForm input.species').value;
        let location = document.querySelector('html body aside fieldset#addForm input.location').value;
        let bait = document.querySelector('html body aside fieldset#addForm input.bait').value;
        let captureTime = document.querySelector('html body aside fieldset#addForm input.captureTime').value;

        if (angler && weight && species && location && bait && captureTime) {
            const myObj = {
                'angler': angler,
                'weight': weight,
                "species": species,
                'location': location,
                'bait': bait,
                'captureTime': captureTime
            };

            let addUrl = `https://fisher-game.firebaseio.com/catches.json`;
            fetch(addUrl, {
                method: 'post',
                body: JSON.stringify(myObj),
            });
        }
    }

    let loadButton = document.getElementsByClassName('load')[0];
    loadButton.addEventListener('click', loadCatches);

    function loadCatches() {
        let catches = document.getElementById('catches'); // append everything here at the end
        catches.innerHTML = '';

        let loadUrl = `https://fisher-game.firebaseio.com/catches.json`;
        fetch(loadUrl)
            .then(response => response.json())
            .then(data => displayData(data));

        function displayData(data) {
            for (const key in data) {
                const object = data[key];

                const id = key;
                const angler = object.angler;
                const bait = object.bait;
                const captureTime = object.captureTime;
                const location = object.location;
                const species = object.species;
                const weight = object.weight;

                updateDOM(id, angler, captureTime, location, species, weight, bait, key);
            }
        }

        function updateDOM(id, angler, captureTime, location, species, weight, bait, key) {
            let divCatch = document.createElement('div');
            divCatch.classList.add('catch');
            divCatch.setAttribute('data-id', id);

            //angler
            let anglerLabel = document.createElement('label');
            anglerLabel.textContent = 'Angler';
            divCatch.appendChild(anglerLabel);
            let anglerInput = document.createElement('input');
            anglerInput.setAttribute('type', 'text');
            anglerInput.classList.add('angler');
            anglerInput.setAttribute('value', angler);
            divCatch.appendChild(anglerInput);
            let hr1 = document.createElement('hr');
            divCatch.appendChild(hr1);

            //weight
            let weightLabel = document.createElement('label');
            weightLabel.textContent = 'Weight';
            divCatch.appendChild(weightLabel);
            let weightInput = document.createElement('input');
            weightInput.setAttribute('type', 'number');
            weightInput.classList.add('weight');
            weightInput.setAttribute('value', weight);
            divCatch.appendChild(weightInput);
            let hr2 = document.createElement('hr');
            divCatch.appendChild(hr2);

            //species
            let speciesLabel = document.createElement('label');
            speciesLabel.textContent = 'Species';
            divCatch.appendChild(speciesLabel);
            let speciesInput = document.createElement('input');
            speciesInput.setAttribute('type', 'text');
            speciesInput.classList.add('species');
            speciesInput.setAttribute('value', species);
            divCatch.appendChild(speciesInput);
            let hr3 = document.createElement('hr');
            divCatch.appendChild(hr3);

            //location
            let locationLabel = document.createElement('label');
            locationLabel.textContent = 'Location';
            divCatch.appendChild(locationLabel);
            let locationInput = document.createElement('input');
            locationInput.setAttribute('type', 'text');
            locationInput.classList.add('location');
            locationInput.setAttribute('value', location);
            divCatch.appendChild(locationInput);
            let hr4 = document.createElement('hr');
            divCatch.appendChild(hr4);

            //bait
            let baitLabel = document.createElement('label');
            baitLabel.textContent = 'Bait';
            divCatch.appendChild(baitLabel);
            let baitInput = document.createElement('input');
            baitInput.setAttribute('type', 'text');
            baitInput.classList.add('bait');
            baitInput.setAttribute('value', bait);
            divCatch.appendChild(baitInput);
            let hr5 = document.createElement('hr');
            divCatch.appendChild(hr5);

            //capture-time
            let captureTimeLabel = document.createElement('label');
            captureTimeLabel.textContent = 'Capture Time';
            divCatch.appendChild(captureTimeLabel);
            let captureTimeInput = document.createElement('input');
            captureTimeInput.setAttribute('type', 'number');
            captureTimeInput.classList.add('captureTime');
            captureTimeInput.setAttribute('value', captureTime);
            divCatch.appendChild(captureTimeInput);
            let hr6 = document.createElement('hr');
            divCatch.appendChild(hr6);

            //update button
            let updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.classList.add('update');
            updateButton.addEventListener('click', updateCatch);
            divCatch.appendChild(updateButton);

            //delete button
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', deleteCatch);
            divCatch.appendChild(deleteButton);

            document.getElementById('catches').appendChild(divCatch);

            function deleteCatch() {
                let deleteUrl = `https://fisher-game.firebaseio.com/catches/${key}.json`
                fetch(deleteUrl, {
                    method: 'delete'
                });
            }

            function updateCatch() {
                let updateUrl = `https://fisher-game.firebaseio.com/catches/${key}.json`;

                const myObj = {
                    'angler': anglerInput.value,
                    'weight': weightInput.value,
                    "species": speciesInput.value,
                    'location': locationInput.value,
                    'bait': baitInput.value,
                    'captureTime': captureTimeInput.value
                };

                fetch(updateUrl, {
                    method: 'put',
                    body: JSON.stringify(myObj),
                });
            }
        }
    }
}
attachEvents();