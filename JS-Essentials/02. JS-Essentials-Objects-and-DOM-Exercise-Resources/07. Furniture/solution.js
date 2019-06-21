function solve() {
  function createAndAddTheObject(object){
    let table = document.getElementsByTagName('tbody')[0];

    let tableRow = document.createElement('tr');

    //image settings
    let imgtd = document.createElement('td');
    imgtd.innerHTML = `<img src="${object.img}">`;
    tableRow.appendChild(imgtd);

    //name settings
    let nametd = document.createElement('td');
    nametd.innerHTML = `<p>${object.name}</p>`;
    tableRow.appendChild(nametd);

    //price settings
    let pricetd = document.createElement('td');
    pricetd.innerHTML = `<p>${object.price}</p>`;
    tableRow.appendChild(pricetd);

    //decFactor settings
    let decFactortd = document.createElement('td');
    decFactortd.innerHTML = `<p>${object.decFactor}</p>`;
    tableRow.appendChild(decFactortd);

    //mark settings
    let marktd = document.createElement('td');
    marktd.innerHTML = `<input type="checkbox"/>`;
    tableRow.appendChild(marktd);

    table.appendChild(tableRow);
  }

  function getInput() {
    let inputTextAreaValue = JSON.parse(document.getElementsByTagName('textarea')[0].value);
    inputTextAreaValue.forEach(function (object) { createAndAddTheObject(object) });

    document.getElementsByTagName('textarea')[0].value = '';
  }

  function buyOptions(){
    let furnitureNames = [];
    let totalPrice = 0;
    let decFactorSum = 0;
    let count = 0;

    let allTrElements = Array.from(document.getElementsByTagName('tr'));

    for (let i = 1; i < allTrElements.length; i++) {
      if(allTrElements[i].children[4].children[0].checked){
        let currentName = allTrElements[i].children[1].children[0].textContent;
        let currentPrice = Number(allTrElements[i].children[2].children[0].textContent);
        let currentDecFactor = Number(allTrElements[i].children[3].children[0].textContent);

        count++;

        furnitureNames.push(currentName);
        totalPrice += currentPrice;
        decFactorSum += currentDecFactor;
      }
    }
    
    decFactorSum /= count;

    let result = `Bought furniture: ${furnitureNames.join(', ')}` 
                + `\n` + `Total price: ${totalPrice.toFixed(2)}` 
                + '\n' + `Average decoration factor: ${decFactorSum}`

    let resultTextArea = document.getElementsByTagName('textarea')[1];
    resultTextArea.textContent = result;

  }

  let firstCheckboxTd = document.getElementsByTagName('td')[4];
  firstCheckboxTd.innerHTML = '<input type="checkbox">';

  let generateButton = document.getElementsByTagName('button')[0];
  generateButton.addEventListener('click', getInput);

  let buyButton = document.getElementsByTagName('button')[1];
  buyButton.addEventListener('click',buyOptions);
}