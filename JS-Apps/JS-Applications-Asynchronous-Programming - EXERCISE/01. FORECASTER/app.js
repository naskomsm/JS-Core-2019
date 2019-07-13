function attachEvents() {
    let getWeatherButton = document.getElementById('submit');
    getWeatherButton.addEventListener('click', displayWeatherReport);

    let location = document.getElementById('location');

    function displayWeatherReport() {
        let locationsURL = `https://judgetests.firebaseio.com/locations.json`;
        fetch(locationsURL)
            .then(response => response.json())
            .then(data => display(data));

        function display(data) {
            let searchedObject = getObject(data);
            document.getElementById('forecast').style.display = 'block'

            let currentConditionsURL = `https://judgetests.firebaseio.com/forecast/today/${searchedObject.code}.json`;
            fetch(currentConditionsURL)
                .then(response => response.json())
                .then(data => displayCurrentCondition(data));

            function displayCurrentCondition(data) {
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