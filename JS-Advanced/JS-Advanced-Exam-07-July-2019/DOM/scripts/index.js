function mySolution(){
    let textInput = document.getElementsByTagName('textarea')[0];
    let usernameInput = document.getElementsByTagName('input')[0];
    
    let sendButton = document.getElementsByTagName('button')[0];
    sendButton.addEventListener('click',sendFunc);

    function sendFunc(){
        if(textInput.value){
            let pendingQuestions = document.getElementById('pendingQuestions');
            function openFunc(){
                let currentDiv = this.parentNode.parentNode;
                let username = currentDiv.children[1].textContent;
                this.parentNode.parentNode.remove();// remove currentDiv

                let div = document.createElement('div');
                div.classList.add('openQuestion');
                
                let img = document.createElement('img');
                img.src = './images/user.png';
                img.width = 32;
                img.height = 32;
                div.appendChild(img);
                
                let span = document.createElement('span');
                span.textContent = username;
                div.appendChild(span);

                let p = document.createElement('p');
                p.textContent = textInput.value;
                console.log(textInput.value);
                div.appendChild(p);

                let secondDiv = document.createElement('div');
                secondDiv.classList.add('actions');

                let replyButton = document.createElement('button');
                replyButton.classList.add('reply');
                replyButton.textContent = 'Reply';
                replyButton.addEventListener('click',replyToQuestion);
                function replyToQuestion(){
                    let currentQuestion = this.parentNode.parentNode;
                    let replySection = currentQuestion.children[4];
                    if(this.textContent === 'Reply'){
                        replySection.style.display = 'block';
                        replyButton.textContent = 'Back';
                    }
                    else{
                        replyButton.textContent = 'Reply';
                        replySection.style.display = 'none';
                    }
                }
                secondDiv.appendChild(replyButton);
                div.appendChild(secondDiv);

                let thirdDiv = document.createElement('div');
                thirdDiv.classList.add('replySection');
                thirdDiv.style.display = 'none';

                let reply = document.createElement('input');
                reply.classList.add('replyInput');
                reply.setAttribute('type', 'text');
                reply.setAttribute('placeholder','Reply to this question here...');
                thirdDiv.appendChild(reply);

                let sendButton = document.createElement('button');
                sendButton.classList.add('replyButton');
                sendButton.textContent = 'Send';
                sendButton.addEventListener('click',sendMessageReply);
                function sendMessageReply(){
                    if(reply.value){
                        let li = document.createElement('li');
                        li.textContent = reply.value;
                        ol.appendChild(li);
                    }
                }
                thirdDiv.appendChild(sendButton);

                let ol = document.createElement('ol');
                ol.classList.add('reply');
                ol.setAttribute('type','1');
                thirdDiv.appendChild(ol);
                
                div.appendChild(thirdDiv);

                let openQuestions = document.getElementById('openQuestions');
                openQuestions.appendChild(div);
            }

            if(usernameInput.value === ''){
                //create elements
                let div = document.createElement('div');
                div.classList.add('pendingQuestion');

                let img = document.createElement('img');
                img.src = './images/user.png';
                img.width = 32;
                img.height = 32;
                div.appendChild(img);

                let span = document.createElement('span');
                span.textContent = 'Anonymous';
                div.appendChild(span);

                let p = document.createElement('p');
                p.textContent = textInput.value;
                div.appendChild(p);

                // inner div
                let secondDiv = document.createElement('div');
                secondDiv.classList.add('actions');

                let archiveButton = document.createElement('button');
                archiveButton.classList.add('archive');
                archiveButton.textContent = 'Archive';
                archiveButton.addEventListener('click',() => div.remove());
                secondDiv.appendChild(archiveButton);

                let openButton = document.createElement('button');
                openButton.classList.add('open');
                openButton.textContent = 'Open';
                openButton.addEventListener('click',openFunc);
                secondDiv.appendChild(openButton);

                div.appendChild(secondDiv);

                pendingQuestions.appendChild(div);
            }
            else{
                //create elements
                let div = document.createElement('div');
                div.classList.add('pendingQuestion');

                let img = document.createElement('img');
                img.src = './images/user.png';
                img.width = 32;
                img.height = 32;
                div.appendChild(img);

                let span = document.createElement('span');
                span.textContent = usernameInput.value;
                div.appendChild(span);

                let p = document.createElement('p');
                p.textContent = textInput.value;
                div.appendChild(p);

                // inner div
                let secondDiv = document.createElement('div');
                secondDiv.classList.add('actions');

                let archiveButton = document.createElement('button');
                archiveButton.classList.add('archive');
                archiveButton.textContent = 'Archive';
                archiveButton.addEventListener('click',() => div.remove());
                secondDiv.appendChild(archiveButton);

                let openButton = document.createElement('button');
                openButton.classList.add('open');
                openButton.textContent = 'Open';
                openButton.addEventListener('click',openFunc);
                secondDiv.appendChild(openButton);

                div.appendChild(secondDiv);

                pendingQuestions.appendChild(div);
            }
        }

        // document.getElementsByTagName('textarea')[0].value = '';
        // document.getElementsByTagName('input')[0].value = '';
    }
}