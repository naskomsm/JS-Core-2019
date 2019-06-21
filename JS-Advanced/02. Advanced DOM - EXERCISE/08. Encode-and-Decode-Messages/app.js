function encodeAndDecodeMessages() {
    let encodeAndSendButton = document.getElementsByTagName('button')[0];
    encodeAndSendButton.addEventListener('click', encode);

    let decodeAndReadButton = document.getElementsByTagName('button')[1];
    decodeAndReadButton.addEventListener('click', decode);

    let encodedMessageArea = document.getElementsByTagName('textarea')[0];
    let decodedMessageArea = document.getElementsByTagName('textarea')[1];

    function encode() {
        let encodedMessage = '';
        for (let i = 0; i < encodedMessageArea.value.length; i++) {
            encodedMessage += String.fromCharCode(encodedMessageArea.value[i].charCodeAt(0) + 1);            
        }

        encodedMessageArea.value = '';
        decodedMessageArea.value = encodedMessage;
    }

    function decode() {
        let decodedMessage = '';
        for (let i = 0; i < decodedMessageArea.value.length; i++) {
            decodedMessage += String.fromCharCode(decodedMessageArea.value[i].charCodeAt(0) - 1);            
        }

        decodedMessageArea.value = decodedMessage;
    }
}