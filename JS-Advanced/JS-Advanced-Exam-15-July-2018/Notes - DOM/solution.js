function addSticker() {
    let sticker = createSticker();
    let stickerList = document.getElementById('sticker-list');
    stickerList.appendChild(sticker);

    function createSticker() {
        let title = document.getElementsByClassName('title')[0].value;
        let content = document.getElementsByClassName('content')[0].value;

        if (title !== '' && content !== '') {
            let li = document.createElement('li');
            li.classList.add('note-content');

            let a = document.createElement('a');
            a.classList.add('button');
            a.textContent = 'x';
            a.addEventListener('click', () => li.remove());

            let h2 = document.createElement('h2');
            h2.textContent = `${title}`;

            let hr = document.createElement('hr');

            let p = document.createElement('p');
            p.textContent = `${content}`;

            li.appendChild(a);
            li.appendChild(h2);
            li.appendChild(hr);
            li.appendChild(p);

            document.getElementsByClassName('title')[0].value = '';
            document.getElementsByClassName('content')[0].value = '';
            return li;
        }
    }
}