function deleteByEmail() {
    const getInput = () => {
        return document.getElementsByName('email')[0].value;
    };

    const clearInputField = () => {
        document.getElementsByName('email')[0].value = '';
    };

    const searchInTableAndRemove = () => {
        const email = getInput();
        const tableRows = document.querySelectorAll('#customers tr td:last-child');
        const rowToDelete = [...tableRows].find(row => row.textContent == email);

        if(rowToDelete){
            let row = tableRows[0].parentNode;
            row.parentNode.removeChild(row);
            document.getElementById('result').textContent = 'Deleted.';
        }
        else{
            document.getElementById('result').textContent = 'Not found.';
        }
    };

    searchInTableAndRemove();
    clearInputField();
}