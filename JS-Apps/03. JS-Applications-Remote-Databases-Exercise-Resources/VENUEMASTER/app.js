function venues() {
    const elements = {
        getVenuesButton: document.getElementById('getVenues'),
        dataInput: document.getElementById('venueDate'),
        username: 'guest',
        password: 'pass',
        baseURL: `https://baas.kinvey.com`,
        venueInfo: document.getElementById('venue-info')
    };

    elements.getVenuesButton.addEventListener('click', getVenues);

    let base_64 = btoa(elements.username + ':' + elements.password);
    const auth = {
        'Authorization': "Basic " + base_64,
        "Content-type": "application/json"
    };

    function getVenues() {
        elements.venueInfo.innerHTML = 'Loading...';
        const postURL = elements.baseURL + `/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${elements.dataInput.value}`;
        
        const myObj = {
            date: elements.dataInput.value
        }
        
        clear();
        fetch(postURL, {
            method: 'post',
            headers: auth,
            body: JSON.stringify(myObj)
        }).then(handler).then(getInfoForeachVenue);
    };

    function getInfoForeachVenue(data) {
        data.forEach(id => {
            const getURL = elements.baseURL + `/appdata/kid_BJ_Ke8hZg/venues/${id}`;
            
            elements.venueInfo.innerHTML = '';
            fetch(getURL, {
                method: 'get',
                headers: auth
            }).then(handler).then(showInfoForeachVenue)
        });
    }
    
    function showInfoForeachVenue(data) {
        const { _id, description, name, price, startingHour } = data;
        
        updateDOM(_id, description, name, price, startingHour);
    }

    function showMoreInfo(){
        console.log("WROKING")
    }

    function updateDOM(_id, description, name, price, startingHour) {
        const divContainer = createHTMLelement('div', 'venue', { name: 'id', value: _id });

        //divContainer Children
        const venueNameSpan = createHTMLelement('span', 'venue-name', null, null, null); // append to divContainer
        let moreInfoButton = createHTMLelement('input', 'info', null, { name: 'type', value: 'button' }, { name: 'value', value: 'More info' });
        moreInfoButton.addEventListener('click',showMoreInfo);
        venueNameSpan.appendChild(moreInfoButton);
        venueNameSpan.innerHTML += name;

        const venueDetailsDiv = createHTMLelement('div', 'venue-details'); // append to divContainer
        venueDetailsDiv.setAttribute('style', 'display: none;');
        const table = createHTMLelement('table');
        const tr1 = createHTMLelement('tr');
        const tr1th1 = createHTMLelement('th');
        const tr1th2 = createHTMLelement('th');
        const tr1th3 = createHTMLelement('th');
        tr1th1.innerHTML = 'Ticket price';
        tr1th2.innerHTML = 'Quantity';
        appendChildren(tr1, [tr1th1, tr1th2, tr1th3]);

        const tr2 = createHTMLelement('tr');
        const tr2td1 = createHTMLelement('td', 'venue-price')
        tr2td1.innerHTML = `${price} lv`;
        const tr2td2 = createHTMLelement('td');
        const select = createHTMLelement('select', 'quantity');
        for (let i = 1; i <= 5; i++) {
            const option = createHTMLelement('option', null, null, null, { name: 'value', value: i });
            option.innerHTML = i;
            select.appendChild(option);
        }
        tr2td2.appendChild(select);
        const tr2td3 = createHTMLelement('td');
        const input = createHTMLelement('input', 'purchase', null, { name: 'type', value: 'button' }, { name: 'value', value: 'Purchase' });
        tr2td3.appendChild(input);

        appendChildren(tr2, [tr2td1, tr2td2, tr2td3]);
        appendChildren(table, [tr1, tr2]);

        const spanHead = createHTMLelement('spanw', 'head', null, null, null); // append to divContainer
        spanHead.innerHTML = 'Venue description:';
        const p1Description = createHTMLelement('p', 'description', null, null, null); // append to divContainer
        p1Description.innerHTML = description;
        const p2Description = createHTMLelement('p','description',null,null,null); // append to divContainer
        p2Description.innerHTML = `Starting time: ${startingHour}`;

        appendChildren(venueDetailsDiv, [table, spanHead, p1Description, p2Description]);

        appendChildren(divContainer, [venueNameSpan, venueDetailsDiv]);
        elements.venueInfo.appendChild(divContainer);
    }












    // usefull functions //

    function clear(){
        elements.dataInput.value = '';
    }

    function createHTMLelement(tagName, className, id, type, value, textContext) {
        let element = document.createElement(tagName);

        if (className) {
            element.classList.add(className);
        }

        if (type) {
            element.setAttribute(type.name, type.value);
        }

        if (value) {
            element.setAttribute(value.name, value.value);
        }

        if (textContext) {
            element.textContext = textContext;
        }

        if (id) {
            element.setAttribute(id.name, id.value);
        }

        return element;
    }

    function appendChildren(parent, children) {
        children.forEach((child) => {
            parent.appendChild(child);
        });
    }

    function handler(response) {
        if (response.status > 400) {
            alert(`Erro: ${response.statusText}`);
            clear();
            elements.venueInfo.innerHTML = '';
            return;
        }

        return response.json();
    }
};

venues();