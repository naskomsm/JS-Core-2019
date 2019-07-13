function attachEvents() {
    let getWeatherButton = document.getElementById('submit');
    getWeatherButton.addEventListener('click', displayWeatherReport);

    let location = document.getElementById('location');

    function displayWeatherReport() {
        let locationsURL = `https://judgetests.firebaseio.com/locations.json`;
        fetch(locationsURL)
            .then(response => response.json())
            .then(data => display(data));

        clear();
        function display(data) {
            let searchedObject = getObject(data);
            document.getElementById('location').value = '';

            if (searchedObject === undefined) {
                alert('Error - 404 Not Found');
                return;
            }

            let currentConditionsURL = `https://judgetests.firebaseio.com/forecast/today/${searchedObject.code}.json`;
            fetch(currentConditionsURL)
                .then(response => response.json())
                .then(data => displayCurrentCondition(data));

            function displayCurrentCondition(data) {
                document.getElementById('forecast').style.display = 'block'
                let currentConditionDiv = document.getElementById('current');

                let forecastsDiv = document.createElement('div');
                forecastsDiv.classList.add('forecasts');

                let conditionalSymbolSpan = document.createElement('span');
                conditionalSymbolSpan.setAttribute('class', 'condition symbol');
                let condition = data.forecast.condition;

                let conditionSymbol = '';
                let degreesSymbol = '°';
                switch (condition) {
                    case 'Sunny':
                        conditionSymbol = `☀`;
                        break;
                    case 'Partly sunny':
                        conditionSymbol = `⛅`;
                        break;
                    case 'Overcast':
                        conditionSymbol = `☁`;
                        break;
                    case 'Rain':
                        conditionSymbol = `☂`;
                        break;
                    default:
                        break;
                }

                conditionalSymbolSpan.textContent = conditionSymbol;
                forecastsDiv.appendChild(conditionalSymbolSpan);

                let conditionSpan = document.createElement('span');
                conditionSpan.classList.add('condition');

                let locationSpan = document.createElement('span');
                locationSpan.classList.add('forecast-data');
                locationSpan.textContent = data.name;
                conditionSpan.appendChild(locationSpan);

                let degreesSpan = document.createElement('span');
                degreesSpan.classList.add('forecast-data');
                degreesSpan.textContent = `${data.forecast.low}${degreesSymbol}/${data.forecast.high}${degreesSymbol}`;
                conditionSpan.appendChild(degreesSpan);

                let typeDiv = document.createElement('span');
                typeDiv.classList.add('forecast-data');
                typeDiv.textContent = `${data.forecast.condition}`;
                conditionSpan.appendChild(typeDiv);

                forecastsDiv.appendChild(conditionSpan);

                currentConditionDiv.appendChild(forecastsDiv);
            }

            let nextThreeDaysURL = `https://judgetests.firebaseio.com/forecast/upcoming/${searchedObject.code}.json`;
            fetch(nextThreeDaysURL)
                .then(response => response.json())
                .then(data => displayNextThreeDays(data));

            function displayNextThreeDays(data) {
                let upcomingDiv = document.getElementById('upcoming');
                let forecastsDiv = document.createElement('div');
                forecastsDiv.classList.add('forecast-info');

                let conditions = data.forecast;
                for (const condition of conditions) {
                    let upcomingSpan = document.createElement('span');
                    upcomingSpan.classList.add('upcoming');
                    let conditionSymbol = '';
                    let degreesSymbol = '°';
                    switch (condition.condition) {
                        case 'Sunny':
                            conditionSymbol = `☀`;
                            break;
                        case 'Partly sunny':
                            conditionSymbol = `⛅`;
                            break;
                        case 'Overcast':
                            conditionSymbol = `☁`;
                            break;
                        case 'Rain':
                            conditionSymbol = `☂`;
                            break;
                        default:
                            break;
                    }

                    let symbolSpan = document.createElement('span');
                    symbolSpan.classList.add('symbol');
                    symbolSpan.textContent = conditionSymbol;
                    upcomingSpan.appendChild(symbolSpan);

                    let degreesSpan = document.createElement('span');
                    degreesSpan.classList.add('forecast-data');
                    degreesSpan.textContent = `${condition.low}${degreesSymbol}/${condition.high}${degreesSymbol}`;
                    upcomingSpan.appendChild(degreesSpan);

                    let typeDiv = document.createElement('span');
                    typeDiv.classList.add('forecast-data');
                    typeDiv.textContent = `${condition.condition}`;
                    upcomingSpan.appendChild(typeDiv);

                    forecastsDiv.appendChild(upcomingSpan);
                    upcomingDiv.appendChild(forecastsDiv);
                }
            }
        }

        function clear() {
            let current = document.getElementById('current');
            let upcoming = document.getElementById('upcoming');
            
            while (current.children.length > 1) {
                current.removeChild(current.children[1]);
            }

            while (upcoming.children.length > 1) {
                upcoming.removeChild(upcoming.children[1]);
            }
        }

        function getObject(data) {
            for (const object in data) {
                if (location.value === data[object].name) {
                    return data[object];
                }
            }
        }
    }
}

attachEvents();