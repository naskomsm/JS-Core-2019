function getInfo() {
    const busesList = document.getElementById("buses");
    busesList.innerHTML = '';

    let stopId = document.getElementById('stopId').value;

    function create(busId, busTime) {
        let li = document.createElement('li');
        li.textContent = `Bus ${busId} arrives in ${busTime} minutes`;

        return li;
    }

    function display(givenBusStopId) {
        const { name, buses } = givenBusStopId;
        document.getElementById('stopName').textContent = name;

        for (const busId in buses) {
            let busTime = buses[busId];
            let result = create(busId, busTime);

            busesList.appendChild(result);
        }
    }

    let url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                const stopName = document.getElementById('stopName');
                stopName.textContent = 'Error';
            }
        })
        .then((data) => display(data))

    // Fetch promises only reject with a TypeError when a network error occurs.
    // Since 4xx and 5xx responses aren't network errors, there's nothing to catch.
}