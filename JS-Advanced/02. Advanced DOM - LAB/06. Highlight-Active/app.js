function focus() {
    let inputs = document.getElementsByTagName('input');

    Array.from(inputs).forEach(element => element.addEventListener('focus', onfocus));
    Array.from(inputs).forEach(element => element.addEventListener('blur', onblur));

    function onfocus(event) {
        let input = event.target;
        input.parentNode.setAttribute('class', 'focused');
    };

    function onblur(event) {
        let input = event.target;
        input.parentNode.removeAttribute('class');
    };
}