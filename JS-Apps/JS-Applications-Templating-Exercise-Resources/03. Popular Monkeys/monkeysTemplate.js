$(() => {
    const template = document.getElementById('monkey-template').innerHTML;
    const compiled = Handlebars.compile(template);

    const rendered = compiled({ monkeys });
    document.getElementsByClassName('monkeys')[0].innerHTML = rendered;

    const handleClick = function () {
        if(this.parentNode.children[3].style.display == 'none'){
            this.parentNode.children[3].style.display = 'block';
        }
        else{
            this.parentNode.children[3].style.display = 'none';
        }
    };
    
    [...document.getElementsByTagName('button')]
        .forEach(button => {
            button.addEventListener('click', handleClick);
        });
})