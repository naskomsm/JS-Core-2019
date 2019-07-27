(() => {
    const renderCatTemplate = () => {
        const template = document.getElementById('cat-template').innerHTML;
        const compiled = Handlebars.compile(template);

        const rendered = compiled({ cats: window.cats });

        document.getElementById('allCats').innerHTML = rendered;
    };

    renderCatTemplate();

    const handleClick = function () {
        if( this.parentNode.children[1].style.display == 'none'){
            this.parentNode.children[1].style.display = 'block';
            this.innerHTML = 'Hide status code';
        }
        else{
            this.parentNode.children[1].style.display = 'none';
            this.innerHTML = 'Show status code';
        }
    };

    [...document.getElementsByClassName('showBtn')]
        .forEach(button => {
            button.addEventListener('click', handleClick);
        });
})();
