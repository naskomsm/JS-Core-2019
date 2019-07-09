function busRoute() {
    let firstStopNumber = document.getElementsByTagName('input')[0].value;
    let secondStopNumber = document.getElementsByTagName('input')[1].value;

    if (firstStopNumber && secondStopNumber && firstStopNumber < secondStopNumber && firstStopNumber != secondStopNumber) {
        if(firstStopNumber <= 0 || firstStopNumber > 6 || secondStopNumber <= 0){
            return;
        }

        let spanInput = document.getElementsByTagName('span')[0];
        spanInput.textContent = `${firstStopNumber}-${secondStopNumber}`;

        let busStops = document.getElementById('bus-stops').children;

        let filteredBusStops = [];
        for (let i = firstStopNumber - 1; i < secondStopNumber; i++) {
            filteredBusStops.push(busStops[i]);
        }

        let copy = [];
        for (let i = 0; i < filteredBusStops.length; i++) {
            let current = filteredBusStops[i];
            if (current !== undefined) {
                let li = document.createElement('li');
                li.textContent = current.textContent;
                copy.push(li);
            }
        }

        let placeToAddLi = document.getElementById('selected-bus-stops');
        while (placeToAddLi.firstChild) {
            placeToAddLi.removeChild(placeToAddLi.firstChild);
        }

        for (let i = 0; i < copy.length; i++) {
            placeToAddLi.appendChild(copy[i]);
        }

        document.getElementsByTagName('input')[0].value = '';
        document.getElementsByTagName('input')[1].value = '';
    }
}

$(() => {
    let busStops = ["Gen. Gurko St.",
        "Sofia University",
        "Eagles' Bridge Sq.",
        "Bulgarian News Agency",
        "Peyo Yavorov Blvd.",
        "Aleksandar Zhendov Bvld.",
        // You can add/remove bus stops from here 
    ]
    let listBusStops = $('#bus-stops')
    for (let i = 0; i < busStops.length; i++) {
        const busStopLi = $('<li>').text(busStops[i]);
        listBusStops.append(busStopLi)
    }
})