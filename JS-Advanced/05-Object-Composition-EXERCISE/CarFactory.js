function createCar(templateObject) {
    function returnProperEngine(enginePowerInt) {
        const engines = [
            { power: 90, volume: 1800 },
            { power: 120, volume: 2400 },
            { power: 200, volume: 3500 }
        ];

        return engines.filter(e => e.power >= enginePowerInt)[0];
    }

    function returnProperCarriage() {
        const carriages = [
            { type: 'hatchback', color: templateObject.color },
            { type: 'coupe', color: templateObject.color }
        ];

        return carriages.filter(c => c.type === templateObject.carriage)[0];
    }

    function returnProperWheelSize(givenSize) {
        if (givenSize % 2 === 0) {
            givenSize--;
        }

        return [givenSize, givenSize, givenSize, givenSize];
    }

    //settings
    let model = templateObject.model;
    let engine = returnProperEngine(templateObject.power);
    let carriage = returnProperCarriage();
    let wheels = returnProperWheelSize(templateObject.wheelsize);

    let object = {
        model: model,
        carriage: carriage,
        engine: engine,
        wheels: wheels
    }

    return object;
}

console.log(createCar({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
}
));