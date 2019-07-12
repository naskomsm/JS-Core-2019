function solve() {
    let info = document.getElementsByTagName('span')[0];

    let currentStop = {
        name: 'depot',
        id: 'depot'
    };

    function depart() {
        function display(busStop) {
            const { name, next } = busStop;

            currentStop.name = name;
            currentStop.id = next;

            info.textContent = `Next stop ${currentStop.name}`;

            document.getElementById('depart').disabled = true;
            document.getElementById('arrive').disabled = false;
        }

        let url = `https://judgetests.firebaseio.com/schedule/${currentStop.id}.json `;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    displayError();
                }
            })
            .then((data) => display(data))
    }

    function arrive() {
        info.textContent = `Arriving at ${currentStop.name}`;

        document.getElementById('depart').disabled = false;
        document.getElementById('arrive').disabled = true;
    }

    function displayError() {
        const stopInfo = document.getElementsByClassName('info')[0];
        stopInfo.textContent = `Error`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();