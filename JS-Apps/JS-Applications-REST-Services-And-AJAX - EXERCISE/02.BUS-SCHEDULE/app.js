function solve() {
    const elements = {
        infoBox: document.getElementsByClassName("info")[0],
        departBtn: document.getElementById("depart"),
        arriveBtn: document.getElementById("arrive")
    };

    const currentStop = {
        name: '',
        id: 'depot'
    };

    const depart = () => {
        const move = (json) => {
            const { name, next } = json

            currentStop.name = name;
            currentStop.id = next;

            elements.infoBox.textContent = `Next stop ${name}`;

            elements.arriveBtn.disabled = false;
            elements.departBtn.disabled = true;
        };

        const url = `https://judgetests.firebaseio.com/schedule/${currentStop.id}.json`;

        fetch(url)
            .then(handler)
            .then(json => move(json));
    };

    const arrive = () => {
        elements.infoBox.textContent = `Arriving at ${currentStop.name}`;

        elements.arriveBtn.disabled = true;
        elements.departBtn.disabled = false;
    };

    const handler = (response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            elements.infoBox.textContent = 'Error';
        }
    }

    return {
        depart,
        arrive
    }
};

const result = solve();