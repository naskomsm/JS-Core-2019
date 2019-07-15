function attachEvents() {
    const elements = {
        inputField: document.getElementById('location'),
        button: document.getElementById('submit'),
        current: document.getElementById('current'),
        upcoming: document.getElementById('upcoming'),
        forecast: document.getElementById('forecast')
    };

    const symbols = {
        sunny: '☀',
        partlySunny: '⛅',
        overcast: '☁',
        rain: '☂',
        degrees: '°'
    };

    elements.button.addEventListener('click', loadWeatherInfo);

    function loadWeatherInfo() {
        fetch('https://judgetests.firebaseio.com/locations.json')
            .then(handler)
            .then(loadLocationWeatherInfo);
    };

    function loadLocationWeatherInfo(data) {
        let location = data.filter((o) => o.name === elements.inputField.value)[0];

        fetch(`https://judgetests.firebaseio.com/forecast/today/${location.code}.json`)
            .then(handler)
            .then(data => showLocationWeatherInfo(data, location.code))
    };

    function showLocationWeatherInfo(data, code) {
        elements.forecast.style.display = 'block';
        let divForecast = createHTMLelement('div', 'forecasts');

        let symbol = symbols[data.forecast.condition.toLowerCase()];
        let spanSymbol = createHTMLelement('span', ['condition', 'symbol'], symbol);

        let spanHolder = createHTMLelement('span', 'condition');

        let degrees = `${data.forecast.low}${symbols.degrees}/${data.forecast.high}${symbols.degrees}`;
        let spanName = createHTMLelement('span', 'forecast-data', data.name);
        let spanDegrees = createHTMLelement('span', 'forecast-data', degrees);
        let spanCondition = createHTMLelement('span', 'forecast-data', data.forecast.condition);

        spanHolder = appendChildrenToParent([spanName, spanDegrees, spanCondition], spanHolder);
        divForecast = appendChildrenToParent([spanSymbol, spanHolder], divForecast);

        elements.current.appendChild(divForecast);

        loadUpcomingLocationWeatherInfo(code);
    };

    function loadUpcomingLocationWeatherInfo(code) {
        fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
            .then(handler)
            .then(showUpcomingLocationWeatherInfo)
    }

    function showUpcomingLocationWeatherInfo(data) {
        let divForecast = createHTMLelement('div', 'forecast-info');

        data.forecast.forEach((o) => {
            let spanHolder = createHTMLelement('span', 'upcoming');

            let symbol = symbols[o.condition.toLowerCase()] || symbols['partlySunny'];
            let degrees = `${o.low}${symbols.degrees}/${o.high}${symbols.degrees}`;

            let spanSymbol = createHTMLelement('span', 'symbol', symbol);
            let spanDegrees = createHTMLelement('span', 'forecast-data', degrees);
            let spanCondition = createHTMLelement('span', 'forecast-data', o.condition);

            spanHolder = appendChildrenToParent([spanSymbol, spanDegrees, spanCondition], spanHolder);
            divForecast.appendChild(spanHolder);
        });

        elements.upcoming.appendChild(divForecast);
    }

    function appendChildrenToParent(children, parent) {
        children.forEach((child) => parent.appendChild(child));

        return parent;
    }

    function createHTMLelement(tagName, className, textContent) {
        let currentElement = document.createElement(tagName);

        if (typeof className === 'string') {
            currentElement.classList.add(className);
        }
        else if (typeof className === 'object') {
            currentElement.classList.add(...className); // [1,2,3,4,5] => class "1 2 3 4 5";
        }

        if (textContent) {
            currentElement.textContent = textContent;
        }

        return currentElement;
    }

    function handler(response) {
        if (response.status > 400) {
            elements.forecast.innerHTML = 'Error';
            elements.forecast.style.display = 'block';
        }

        return response.json();
    };
}

attachEvents();