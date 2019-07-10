function solve() {
    let info = document.getElementsByTagName('span')[0];

    let currentStop = {
        name: 'depot',
        next: 'depot'
    };

    function depart() {
        function display(stopId) {
            const { name, next } = stopId;
            
            currentStop.name = name;
            currentStop.next = next;

            info.textContent = `Next stop ${currentStop.name}`;

            document.getElementById('depart').disabled = true;   
            document.getElementById('arrive').disabled = false;   
        }

        let url = `https://judgetests.firebaseio.com/schedule/${currentStop.next}.json `;
        fetch(url)
            .then((response) => response.json())
            .then((data) => display(data))
    }

    function arrive() {
        info.textContent = `Arriving at ${currentStop.name}`;

        document.getElementById('depart').disabled = false;   
        document.getElementById('arrive').disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();