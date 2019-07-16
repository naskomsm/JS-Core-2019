function attachEvents() {
    const elements = {
        loadButton: document.getElementById('btnLoadPosts'),
        viewButton: document.getElementById('btnViewPost'),
        url: `https://blog-apps-c12bf.firebaseio.com/`,
        posts: document.getElementById('posts'),
        postTitle: document.getElementById('post-title'),
        text: document.getElementById('post-body'),
        comments: document.getElementById('post-comments')
    };

    elements.viewButton.addEventListener('click', loadSelectedInformation);
    elements.loadButton.addEventListener('click', loadPosts);

    function loadPosts() {
        const getURL = elements.url + 'posts.json';
        fetch(getURL)
            .then(handler)
            .then(attachPostsToDropDown);
    };

    function attachPostsToDropDown(data) {
        for (const key in data) {
            // const id = data[key].id;
            const title = data[key].title;
            const option = makeOptionElement(key, title);
            elements.posts.appendChild(option);
        }
    }

    function loadSelectedInformation() {
        clear();
        const selectedOptionPostId = getSelectedOption();
        const viewURL = elements.url + `posts/${selectedOptionPostId}.json`;

        fetch(viewURL)
            .then(handler)
            .then(showSelectedInformation);
    }

    function getSelectedOption() {
        for (const post of elements.posts) {
            if (post.selected) {
                return post.value;
            }
        }
    }

    function showSelectedInformation(data) {
        const idMatch = data.id;
        elements.postTitle.textContent = data.title;
        elements.text.textContent = data.body;

        const commentsURL = elements.url + `comments.json`;
        fetch(commentsURL)
            .then(handler)
            .then(findCorrectComments);

        function findCorrectComments(data) {
            for (const key in data) {
                if (data[key].postId === idMatch) {
                    let li = document.createElement('li');
                    li.textContent = data[key].text;

                    elements.comments.appendChild(li);
                }
            }
        }
    }

    function makeOptionElement(value, textContext) {
        let option = document.createElement('option');
        option.setAttribute('value', value);
        option.textContent = textContext;

        return option;
    }

    function clear(){
        elements.postTitle = 'Post Details';
        elements.text.innerHTML = '';
        elements.comments.innerHTML = '';
    }

    function handler(response) {
        if (response.status > 400) {
            alert(`Error: ${response.statusText}`);
            return;
        }

        return response.json();
    }
}

attachEvents();