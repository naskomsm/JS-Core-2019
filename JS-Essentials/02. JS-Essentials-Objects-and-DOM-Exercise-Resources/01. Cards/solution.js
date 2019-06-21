function solve() {
    function clickEvent() {
        this.src = "images/whiteCard.jpg";

        let firstPlayerDiv = document.getElementById('player1Div');
        let secondPlayerDiv = document.getElementById('player2Div');

        let result = document.getElementById('result');

        let leftResult = result.children[0];
        let rightResult = result.children[2];

        if (this.parentNode === firstPlayerDiv) {
            leftResult.textContent = this.name;
        } else if (this.parentNode === secondPlayerDiv) {
            rightResult.textContent = this.name;
        }

        if (leftResult.textContent && rightResult.textContent) {
            if (Number(this.name) > Number(previousCard.name)) {
                this.style.border = '2px solid green';
                previousCard.style.border = '2px solid red';
            }
            else if (Number(this.name) < Number(previousCard.name)) {
                this.style.border = '2px solid red';
                previousCard.style.border = '2px solid green';
            }

            let historyElement = document.getElementById('history');
            historyElement.textContent += `[${Number(leftResult.textContent)} vs ${Number(rightResult.textContent)}] `;

            leftResult.textContent = '';
            rightResult.textContent = '';
        }

        previousCard = this;
    }

    let previousCard;
    Array.from(document.getElementsByTagName('img')).map(x => x.addEventListener('click', clickEvent));
}