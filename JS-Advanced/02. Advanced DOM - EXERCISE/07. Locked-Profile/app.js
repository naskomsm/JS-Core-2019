function lockedProfile() {
    let allButtons = document.getElementsByTagName('button');
    [...allButtons].forEach((button) => {
        button.addEventListener('click', onClick);
    });

    function onClick() {
        let parentChildren = this.parentNode.children;

        let unlockCheckBox = parentChildren[4];
        let hiddenFields = parentChildren[parentChildren.length - 2];
        let button = parentChildren[parentChildren.length - 1];

        if (hiddenFields.style.display !== 'block') {
            if (unlockCheckBox.checked == true) {
                hiddenFields.style.display = 'block';
                button.innerHTML = 'Hide it';
            }
        }
        else if (hiddenFields.style.display == 'block') {
            if (unlockCheckBox.checked == true) {
                hiddenFields.style.display = 'none';
                button.innerHTML = 'Show more';
            }
        }
    }
}