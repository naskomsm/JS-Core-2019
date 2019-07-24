
let template = document.getElementById('template').innerHTML; // get the template
let templateFunc = Handlebars.compile(template); // make it to func

let information = { name: 'Atanas', race: 'Human' }; // data to put into template

let result = templateFunc(information); // use the func -> returns HTML
document.body.append(result);
