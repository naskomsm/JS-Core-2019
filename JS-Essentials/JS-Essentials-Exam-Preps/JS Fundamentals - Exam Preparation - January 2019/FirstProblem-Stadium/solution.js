function solve() {
    let price = 0;
    let fans = 0;

    function numbersClick() {
        let parent = this.parentNode.parentNode;

        let indexOfClickedElement = 0;
        for (let i = 0; i < parent.children.length; i++) {
            if (this === parent.children[i].children[0]) {
                indexOfClickedElement = i;
            }
        }

        let sectionName = this.parentNode.parentNode.parentNode.parentNode.parentNode.className; // levski / litex / VIP

        let sector = '';
        if (indexOfClickedElement === 0) {
            sector = 'A';
        }
        else if (indexOfClickedElement === 1) {
            sector = 'B';
        }
        else if (indexOfClickedElement === 2) {
            sector = 'C';
        }

        //display the message for marked and unmarked
        if(this.style.backgroundColor === 'rgb(255, 0, 0)'){
            document.getElementById('output').textContent += ` Seat ${this.textContent} in zone ${sectionName} sector ${sector} is unavailable.\n`
        }
        else{
            this.style.backgroundColor = 'rgb(255, 0, 0)';
            document.getElementById('output').textContent += ` Seat ${this.textContent} in zone ${sectionName} sector ${sector} was taken.\n`

            if((sectionName === 'Levski' || sectionName === 'Litex') && sector === 'A'){
                price += 10;
            }
            else if((sectionName === 'Levski' || sectionName === 'Litex') && sector === 'B'){
                price += 7;
            }
            else if((sectionName === 'Levski' || sectionName === 'Litex') && sector === 'C'){
                price += 5;
            }
            else if(sectionName === 'VIP' && sector === 'A'){
                price += 25;
            }
            else if(sectionName === 'VIP' && sector === 'B'){
                price += 15;
            }
            else if(sectionName === 'VIP' && sector === 'C'){
                price += 10;
            }
            
            fans++;
        }
    }

    function summary(){
        document.getElementById('summary').children[1].textContent = `${price} leva, ${fans} fans.`
    }

    let allButtons = Array.from(document.getElementsByClassName('seat'));
    allButtons.map(x => x.addEventListener('click', numbersClick));

    let summaryButton = document.getElementById('summary').children[0];
    summaryButton.addEventListener('click',summary);
}