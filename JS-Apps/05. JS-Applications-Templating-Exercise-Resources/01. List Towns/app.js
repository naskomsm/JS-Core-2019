(() => {
    const elements = {
        button: document.getElementById('btnLoadTowns'),
        input: document.getElementById('towns'),
        root: document.getElementById('root')
    };

    const loadTowns = () => {
        const towns = elements.input.value
            .split(', ')
            .map(element => {
                return { name: element }
            });

        renderTowns(towns);
    };

    const renderTowns = (towns) => {
        let template = document.getElementById('towns-template').innerHTML;
        let compiled = Handlebars.compile(template);

        let rendered = compiled({ towns });

        elements.root.innerHTML = rendered;
    };

    elements.button.addEventListener('click', loadTowns);
})();