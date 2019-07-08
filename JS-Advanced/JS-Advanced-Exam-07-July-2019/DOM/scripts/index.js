function mySolution() {
    let textInput = document.getElementsByTagName('textarea')[0];
    let usernameInput = document.getElementsByTagName('input')[0];

    let sendButton = document.getElementsByTagName('button')[0];
    sendButton.addEventListener('click', displayPendingQuestion);

    function displayPendingQuestion() {
        if (textInput.value) {
            let pendingQuestion;
            if (usernameInput.value) {
                pendingQuestion = createPendingQuestion(usernameInput.value, textInput.value);
            }
            else {
                pendingQuestion = createPendingQuestion('Anonymous', textInput.value);
            }

            document.getElementById('pendingQuestions').appendChild(pendingQuestion);
        }

        usernameInput.value = '';
        textInput.value = '';
    }

    function createPendingQuestion(username, text) {
        let div = document.createElement('div');
        div.classList.add('pendingQuestion');

        let img = document.createElement('img');
        img.src = './images/user.png';
        img.width = '32';
        img.height = '32';
        div.appendChild(img);

        let span = document.createElement('span');
        span.textContent = username;
        div.appendChild(span);

        let p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);

        let divActions = document.createElement('div');
        divActions.classList.add('actions');

        let archiveButton = document.createElement('button');
        archiveButton.classList.add('archive');
        archiveButton.textContent = 'Archive';
        archiveButton.addEventListener('click', () => div.remove());
        divActions.appendChild(archiveButton);

        let openButton = document.createElement('button');
        openButton.classList.add('open');
        openButton.textContent = 'Open';
        openButton.addEventListener('click', displayOpenQuestion);
        divActions.appendChild(openButton);

        div.appendChild(divActions);
        return div;
    }

    function createOpenQuestion(username, text) {
        let div = document.createElement('div');
        div.classList.add('openQuestion');

        let img = document.createElement('img');
        img.src = './images/user.png';
        img.width = '32';
        img.height = '32';
        div.appendChild(img);

        let span = document.createElement('span');
        span.textContent = username;
        div.appendChild(span);

        let p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);

        let divActions = document.createElement('div');
        divActions.classList.add('actions');

        let replyButton = document.createElement('button');
        replyButton.classList.add('reply');
        replyButton.textContent = 'Reply';
        replyButton.addEventListener('click',greenReplyButtonFunctionality);
        divActions.appendChild(replyButton);
        div.appendChild(divActions);

        let divReplySection = document.createElement('div');
        divReplySection.classList.add('replySection');
        divReplySection.style.display = 'none';

        let replyInput = document.createElement('input');
        replyInput.classList.add('replyInput');
        replyInput.setAttribute('type', 'text');
        replyInput.setAttribute('placeholder', 'Reply to this question here...');
        divReplySection.appendChild(replyInput);

        let sendButton = document.createElement('button');
        sendButton.classList.add('replyButton');
        sendButton.textContent = 'Send';
        sendButton.addEventListener('click',replyToPerson);
        divReplySection.appendChild(sendButton);

        let ol = document.createElement('ol');
        ol.classList.add('reply');
        ol.setAttribute('type', '1');
        divReplySection.appendChild(ol);

        div.appendChild(divReplySection);
        return div;
    }

    function displayOpenQuestion() {
        let pendingQuestionToRemove = this.parentNode.parentNode;
        let username = pendingQuestionToRemove.children[1].textContent;
        let text = pendingQuestionToRemove.children[2].textContent;
        pendingQuestionToRemove.remove();

        let openQuestion;

        if (username) {
            openQuestion = createOpenQuestion(username, text);
        }
        else {
            openQuestion = createOpenQuestion('Anonymous',text);
        }

        document.getElementById('openQuestions').appendChild(openQuestion);
    }

    function greenReplyButtonFunctionality() {
        let divReplySection = this.parentNode.parentNode.children[4];
        if(this.textContent === 'Reply'){
            this.textContent = 'Back';
            divReplySection.style.display = 'block';
        }
        else if(this.textContent === 'Back'){
            this.textContent = 'Reply';
            divReplySection.style.display = 'none';
        }
    }

    function replyToPerson(){
        let message = this.parentNode.children[0].value;
        let placeToPutMessage = this.parentNode.children[2];
        let li = document.createElement('li');
        li.textContent = message;
        placeToPutMessage.appendChild(li);

        this.parentNode.children[0].value = '';

    }
}