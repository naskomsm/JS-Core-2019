function solve() {
   let sendButton = document.getElementById('send');
   sendButton.addEventListener('click', onClick);

   function onClick() {
      let text = document.getElementById('chat_input').value;

      let divElement = document.createElement('div');
      divElement.setAttribute('class', 'message my-message');
      if (text !== '') {
         divElement.textContent = text;

         let chat = document.getElementById('chat_messages');
         chat.appendChild(divElement);

         document.getElementById('chat_input').value = '';
      }
      else{
         alert('Cannot send empty message!');
      }
   }
}
