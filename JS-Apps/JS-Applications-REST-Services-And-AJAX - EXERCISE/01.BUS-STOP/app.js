function getInfo() {
    const elements = {
        button: document.getElementById('submit'),
        busesList: document.getElementById("buses"),
        stopName: document.getElementById('stopName'),
        stopId: document.getElementById('stopId')
    };

    loadStopInfo();
    function loadStopInfo() {
        fetch(`https://judgetests.firebaseio.com/businfo/${elements.stopId.value}.json`)
            .then(handler)
            .then(showStopInfo);
    }

    function showStopInfo(data) {
        const { buses, name } = data;
        for (const busId in buses) {
            elements.stopName.textContent = name;

            let busTime = buses[busId];
            let li = createLi(busId, busTime);

            elements.busesList.appendChild(li);
        }

        clearField();
    }

    function createLi(busId, busTime) {
        let li = document.createElement('li');
        li.textContent = `Bus ${busId} arrives in ${busTime} minutes`;

        return li;
    }

    function clearField() {
        elements.stopId.value = '';
    }

    function handler(response) {
        if (response.status > 400) {
            elements.stopName.textContent = `Error: ${response.statusText}`;
        }

        return response.json();
        // Fetch promises only reject with a TypeError when a network error occurs.
        // Since 4xx and 5xx responses aren't network errors, there's nothing to catch.
    }
}