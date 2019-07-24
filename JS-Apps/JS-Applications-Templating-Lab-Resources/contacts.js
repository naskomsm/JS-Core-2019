(async () => {
    const contacts = [
        {
            id: 1,
            name: "John",
            phoneNumber: "0847759632",
            email: "john@john.com"
        },
        {
            id: 2,
            name: "Merrie",
            phoneNumber: "0845996111",
            email: "merrie@merrie.com"
        },
        {
            id: 3,
            name: "Adam",
            phoneNumber: "0866592475",
            email: "adam@stamat.com"
        },
        {
            id: 4,
            name: "Peter",
            phoneNumber: "0866592475",
            email: "peter@peter.com"
        },
        {
            id: 5,
            name: "Max",
            phoneNumber: "0866592475",
            email: "max@max.com"
        },
        {
            id: 6,
            name: "David",
            phoneNumber: "0866592475",
            email: "david@david.com"
        }
    ];

    try {
        let response = await fetch('./templates/contact-card.hbs');
        let src = await response.text();
        let template = Handlebars.compile(src);
        const html = template({ contacts });
        document.getElementById('contacts').innerHTML = html;

        [...document.getElementsByClassName('detailsBtn')]
            .forEach(button => {
                button.addEventListener('click', handleClick);
            });

        function handleClick () {
            if(this.parentNode.children[2].style.display == 'block'){
                this.parentNode.children[2].style.display = 'none';
            }
            else{
                this.parentNode.children[2].style.display = 'block';
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})();