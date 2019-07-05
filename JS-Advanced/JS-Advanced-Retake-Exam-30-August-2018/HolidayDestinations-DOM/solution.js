function addDestination(){
    let city = document.getElementsByClassName('inputData')[0].value;
    let country = document.getElementsByClassName('inputData')[1].value;
    let season = getSeasonInput();

    if(city !== '' && country !== ''){
        createRowAndAppendToTable();
    }
    
    function createRowAndAppendToTable(){
        let table = document.getElementById('destinationsList');
        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        td1.innerHTML = `${city}, ${country}`;
        td2.innerHTML = `${season}`;

        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);

        updateDestinations();
        clearFields();
    }

    function getSeasonInput(){
        let seasonsMenu = document.getElementById('seasons').children;
        let season = '';

        Array.from(seasonsMenu).forEach((currentSeason) => {
            if(currentSeason.selected){
                season = currentSeason.innerHTML;
            }
        });

        return season;
    }

    function clearFields(){
        document.getElementsByClassName('inputData')[0].value = '';
        document.getElementsByClassName('inputData')[1].value = '';
    }

    function updateDestinations(){
        let summaryBox = document.querySelectorAll('#summaryBox input');
        Array.from(summaryBox).forEach((currentSeason) => {
            if(currentSeason.id === season.toLowerCase()){
                let value = +currentSeason.getAttribute('value');
                value++;
                currentSeason.setAttribute('value',value);
            }
        });

    }
}