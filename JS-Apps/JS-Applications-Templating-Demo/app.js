let template = document.getElementById('template').innerHTML; // get the template ( string )
let templateFunc = Handlebars.compile(template); // make it to func ( function )

let information = { name: 'Atanas', occupation: 'Human' }; // data to put into template

let result = templateFunc(information); // use the func -> returns HTML ( string )
document.body.innerHTML = result;