function attachEvents() {
    let loadButton = document.getElementById('btnLoadPosts');
    loadButton.addEventListener('click', loadPosts);

    let viewButton = document.getElementById('btnViewPost');
    viewButton.addEventListener('click', viewPost);

    let url = `https://blog-apps-c12bf.firebaseio.com/`;
    let posts = document.getElementById('posts');

    function loadPosts() {
        let loadPostsURL = url + `posts.json`;

        fetch(loadPostsURL)
            .then(response => response.json())
            .then(data => display(data));

        function display(data) {
            for (const key in data) {
                let value = key;
                let title = data[key].title;
                appendToDOM(value, title);
            }

            function appendToDOM(value, title) {
                let option = document.createElement('option');
                option.textContent = title;
                option.setAttribute('value', value);
                posts.appendChild(option);
            }
        }
    }

    function viewPost() {
        let selectedPost = getSelected();

        let currentPostURL = url + `posts/${selectedPost}.json`;
        fetch(currentPostURL)
            .then(response => response.json())
            .then(data => getPost(data));

        function getPost(data) {
            const { body, id, title } = data;

            let currentPostCommentsURL = url + `comments.json`;
            fetch(currentPostCommentsURL)
            .then(response => response.json())
            .then(data => displayComments(data));
            
            function displayComments(data) {
                document.getElementById('post-comments').innerHTML = '';
                for (const comment in data) {
                    if (data[comment].postId === id) {
                        let text = data[comment].text;
                        let id = data[comment].id;

                        modifyDOM(title, body, text, id);
                    }
                }
            }

            function modifyDOM(title, body, text, id) {
                document.getElementById('post-title').textContent = title;
                document.getElementById('post-body').textContent = body;

                let ul = document.getElementById('post-comments');
                let li = document.createElement('li');
                li.textContent = text;
                li.setAttribute('id', id);
                ul.appendChild(li);
            }
        }


    }

    function getSelected() {
        for (const post of posts) {
            if (post.selected) {
                return post.value;
            }
        }
    }
}

attachEvents();