function getInfo() {
    const elements = {
        button: document.getElementById('submit'),
        busesList: document.getElementById('buses'),
        stopName: document.getElementById('stopName'),
        stopId: document.getElementById('stopId')
    };

    const url = `https://judgetests.firebaseio.com/businfo/${elements.stopId.value}.json`;


    const handler = (response) => {
        if (response.status > 400) {
            elements.stopName.textContent = `Error: ${response.statusText}`;
        }

        elements.busesList.innerHTML = '';
        return response.json();
    }

    const display = (json) => {
        const { name, buses } = json;

        for (const busId in buses) {
            elements.stopName.textContent = name;

            let busTime = buses[busId];
            let li = createLi(busId, busTime);

            elements.busesList.appendChild(li);
        }

        elements.stopId.value = '';
    };

    const createLi = (busId, busTime) => {
        let li = document.createElement('li');
        li.textContent = `Bus ${busId} arrives in ${busTime} minutes`;

        return li;
    }
    
    const laodBusInfo = () => {
        fetch(url)
            .then(handler)
            .then(display);
    };

    laodBusInfo();
}