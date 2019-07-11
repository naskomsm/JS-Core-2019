function attachEvents() {
    let sendButton = document.getElementById('submit');
    sendButton.addEventListener('click', sendMessage);

    let refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', getMessages);

    let authorName = document.getElementById('author');
    let msgText = document.getElementById('content');

    let url = `https://rest-messanger.firebaseio.com/messanger.json`;
    function sendMessage() {
        const myObj = {
            "author": authorName.value,
            "content": msgText.value,
        }

        fetch(url, {
            method: 'post',
            body: JSON.stringify(myObj),
        })
    }

    function getMessages() {
        let result = [];
        function display(data) {
            for (const message in data) {
                const { author, content } = data[message];
                getMessage(author, content);
            }

            let textArea = document.getElementById('messages');
            textArea.textContent = result.join('\n');
        }

        function getMessage(author, content) {
            result.push(`${author}: ${content}`);
        }


        fetch(url)
            .then(response => response.json())
            .then(data => display(data));
    }
}

attachEvents();