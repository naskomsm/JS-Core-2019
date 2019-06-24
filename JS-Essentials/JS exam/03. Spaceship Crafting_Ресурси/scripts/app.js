function spaceshipCrafting() {
    let titaniumCoreFound = document.getElementById('titaniumCoreFound').value;
    let aluminiumCoreFound = document.getElementById('aluminiumCoreFound').value;
    let magnesiumCoreFound = document.getElementById('magnesiumCoreFound').value;
    let carbonCoreFound = document.getElementById('carbonCoreFound').value;

    let lossesPercent = (document.getElementById('lossesPercent').value / 4) / 100;

    titaniumCoreFound -= titaniumCoreFound * lossesPercent;
    aluminiumCoreFound -= aluminiumCoreFound * lossesPercent;
    magnesiumCoreFound -= magnesiumCoreFound * lossesPercent;
    carbonCoreFound -= carbonCoreFound * lossesPercent;

    let titaniumBars = Math.round(titaniumCoreFound / 25);
    let aluminiumBars = Math.round(aluminiumCoreFound / 50);
    let magnesiumBars = Math.round(magnesiumCoreFound / 75);
    let carbonCoreBars = Math.round(carbonCoreFound / 100);

    let spaceships = {
        'THE-UNDEFINED-SHIP': 0,
        'NULL-MASTER': 0,
        'JSON-CREW': 0,
        'FALSE-FLEET': 0
    };

    while (titaniumBars > 2 && aluminiumBars > 2 && magnesiumBars > 3 && carbonCoreBars > 1) {
        if (titaniumBars >= 7 && aluminiumBars >= 9 && magnesiumBars >= 7 && carbonCoreBars >= 7) {
            spaceships['THE-UNDEFINED-SHIP']++;

            titaniumBars -= 7;
            aluminiumBars -= 9;
            magnesiumBars -= 7;
            carbonCoreBars -= 7;
        }
        if (titaniumBars >= 5 && aluminiumBars >= 7 && magnesiumBars >= 7 && carbonCoreBars >= 5) {
            spaceships['NULL-MASTER']++;

            titaniumBars -= 5;
            aluminiumBars -= 7;
            magnesiumBars -= 7;
            carbonCoreBars -= 5;
        }
        if (titaniumBars >= 3 && aluminiumBars >= 5 && magnesiumBars >= 5 && carbonCoreBars >= 2) {
            spaceships['JSON-CREW']++;

            titaniumBars -= 3;
            aluminiumBars -= 5;
            magnesiumBars -= 5;
            carbonCoreBars -= 2;
        }
        if (titaniumBars >= 2 && aluminiumBars >= 2 && magnesiumBars >= 3 && carbonCoreBars >= 1) {
            spaceships['FALSE-FLEET']++;

            titaniumBars -= 2;
            aluminiumBars -= 2;
            magnesiumBars -= 3;
            carbonCoreBars -= 1;
        }
    }

    for (const key in spaceships) {
        if(spaceships[key] < 0 || spaceships[key] === undefined){
            spaceships[key] = 0;
        }
    }

    Object.filter = (spaceships, predicate) =>
        Object.keys(spaceships)
            .filter(key => predicate(spaceships[key]))
            .reduce((res, key) => (res[key] = spaceships[key], res), {});

    var filteredSpaceships = Object.filter(spaceships, shipsCount => shipsCount > 0);

    document.querySelector('#availableBars p').textContent = `${titaniumBars} titanium bars, ${aluminiumBars} aluminum bars, ${magnesiumBars} magnesium bars, ${carbonCoreBars} carbon bars`;

    let result = [];
    for (const ship in filteredSpaceships) {
        result.push(`${filteredSpaceships[ship]} ${ship}`);
    }

    document.querySelector('#builtSpaceships p').textContent = result.filter(r => r !== '').join(', ');
}