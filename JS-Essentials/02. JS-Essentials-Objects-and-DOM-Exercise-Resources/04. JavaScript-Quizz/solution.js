function solve() {
  let allAnswers = document.getElementsByClassName('answer-text');
  [...allAnswers].forEach((answer) => {
    answer.addEventListener('click', onClick);
  });

  let allSections = Array.from(document.getElementsByTagName('section'));
  let rightAnswers = 0;

  let sectionCounter = 0;
  function onClick() {

    if (sectionCounter === 0) {
      if (this.textContent === 'onclick') {
        rightAnswers++;
      }

      sectionCounter++;
      allSections[0].style.display = 'none';
      allSections[1].style.display = 'block';
    }
    else if (sectionCounter === 1) {
      if (this.textContent === 'JSON.stringify()') {
        rightAnswers++;
      }

      sectionCounter++;
      allSections[1].style.display = 'none';
      allSections[2].style.display = 'block';
    }
    else if (sectionCounter === 2) {
      if (this.textContent === 'A programming API for HTML and XML documents') {
        rightAnswers++;
      }

      sectionCounter++;
      allSections[2].style.display = 'none';
      document.getElementById('results').style.display = 'block';

      if (rightAnswers === 3) {
        document.querySelector('.results-inner h1').textContent = "You are recognized as top JavaScript fan!"
      }
      else {
        document.querySelector('.results-inner h1').textContent = `You have ${rightAnswers} right answers`
      }
    }
  }
}


