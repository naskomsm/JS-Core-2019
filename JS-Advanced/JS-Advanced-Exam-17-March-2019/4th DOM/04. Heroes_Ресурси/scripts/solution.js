function solve() {
   const validKingdomNames = ['CASTLE', 'DUNGEON', 'FORTRESS', 'INFERNO', 'NECROPOLIS', 'RAMPART', 'STRANGHOLD', 'TOWER', 'CONFLUX'];

   let rebuildButton = document.getElementsByTagName('button')[0];
   rebuildButton.addEventListener('click', rebuildOnClick);
   function rebuildOnClick() {
      let kingdomField = document.getElementsByTagName('input')[0];
      let kingField = document.getElementsByTagName('input')[1];

      if (kingField.value.length >= 2 && validKingdomNames.includes(kingdomField.value.toUpperCase())) {

         // find the given kingdom and make it visible
         let id = kingdomField.value.toLowerCase();
         let element = document.getElementById(id);
         element.style.display = 'inline-block';

         // creating the required stuff and appending it to the element
         function updateElement() {
            let h1 = document.createElement('h1');
            h1.innerHTML = kingdomField.value.toUpperCase();

            let div = document.createElement('div');
            div.classList.add('castle');

            let h2 = document.createElement('h2');
            h2.innerHTML = kingField.value.toUpperCase();

            let fieldset = document.createElement('fieldset'); // childs are the given below

            let legend = document.createElement('legend');
            legend.innerHTML = 'Army';
            let tanksP = document.createElement('p');
            tanksP.innerHTML = 'TANKS - 0';
            let fightersP = document.createElement('p');
            fightersP.innerHTML = 'FIGHTERS - 0';
            let magessP = document.createElement('p');
            magessP.innerHTML = 'MAGES - 0';
            let armyDiv = document.createElement('div');
            armyDiv.classList.add('armyOutput');

            fieldset.appendChild(legend);
            fieldset.appendChild(tanksP);
            fieldset.appendChild(fightersP);
            fieldset.appendChild(magessP);
            fieldset.appendChild(armyDiv);

            element.appendChild(h1);
            element.appendChild(div);
            element.appendChild(h2);
            element.appendChild(fieldset);
         }
         updateElement();
      }

      else { // reset the input field if the given data is invalid
         kingdomField = '';
         kingField = '';
      }
   }

   let joinButton = document.getElementsByTagName('button')[1];
   joinButton.addEventListener('click', joinKingdom);
   function joinKingdom() {
      let allRadioCheckers = document.getElementsByName('characterType');
      if (allRadioCheckers[0].checked === false && allRadioCheckers[1].checked === false && allRadioCheckers[2].checked === false) {
         return;
      }

      let charactersSection = document.getElementById('characters');
      let charNameAndKingdomName = charactersSection.children[3]; // div holding charName and kingdomName
      let characterName = charNameAndKingdomName.children[0];
      let kingdomName = charNameAndKingdomName.children[1];

      if (characterName.value.length < 2 || !validKingdomNames.includes(kingdomName.value.toUpperCase())) {
         return
      }

      if (kingdomName.value.length === 0 && characterName.value.length === 0) {
         return;
      }

      function checkKingdomExistence() {
         let id = kingdomName.value.toLowerCase();
         let element = document.getElementById(id);
         if (element.style.display === 'none') {
            return false;
         }

         return true;
      }

      let kingdomExist = checkKingdomExistence();

      if (kingdomExist) {
         let id = kingdomName.value.toLowerCase();
         let element = document.getElementById(id);

         let fieldsetInfo = element.children[3];

         if (allRadioCheckers[0].checked) { // TANK
            let fighterParagraph = fieldsetInfo.children[2];
            let text = fighterParagraph.textContent.split(' - ');

            let type = text[0]; // TANKS
            let count = +text[1]; // 0
            count++;

            fighterParagraph.textContent = `${type} - ${count}`;
         }
         else if (allRadioCheckers[1].checked) { // MAGE
            let mageParagraph = fieldsetInfo.children[3];
            let text = mageParagraph.textContent.split(' - ');

            let type = text[0]; // MAGES
            let count = +text[1]; // 0
            count++;

            mageParagraph.textContent = `${type} - ${count}`;
         }
         else if (allRadioCheckers[2].checked) { // FIGHTER
            let tankParagraph = fieldsetInfo.children[1];
            let text = tankParagraph.textContent.split(' - ');

            let type = text[0]; // FIGHTERS
            let count = +text[1]; // 0
            count++;

            tankParagraph.textContent = `${type} - ${count}`;
         }

         let divArmyOutput = fieldsetInfo.children[4];
         divArmyOutput.textContent += characterName.value + ' ';
      }

      else { // again reset fields if input is invalid
         kingdomName.value = '';
         characterName.value = '';
      }
   }

   let attackButton = document.getElementsByTagName('button')[2];
   attackButton.addEventListener('click', attackOnClick);
   function attackOnClick() {
      let actionsSection = document.getElementById('actions');

      let attackerInputFiled = actionsSection.children[1];
      let deffenderInputField = actionsSection.children[2];

      if (!validKingdomNames.includes(attackerInputFiled.value.toUpperCase()) || !validKingdomNames.includes(deffenderInputField.value.toUpperCase())) {
         return;
      }

      if (attackerInputFiled.value.length === 0 && deffenderInputField.value.length === 0) {
         return;
      }

      let idOfAttacker = attackerInputFiled.value.toLowerCase();
      let attackerElement = document.getElementById(idOfAttacker);

      let idOfDeffender = deffenderInputField.value.toLowerCase();
      let deffenderElement = document.getElementById(idOfDeffender);

      function checkBothKingdomsExistence(){
         if (attackerElement.style.display === 'none' || deffenderElement.style.display === 'none') {
            return false;
         }
         
         return true;
      }

      let bothKingdomsExist = checkBothKingdomsExistence();

      if (bothKingdomsExist) {
         let attackerKingdomName = document.getElementById(attackerInputFiled.value);
         let deffenderKingdomName = document.getElementById(deffenderInputField.value);

         let attackerAttackPoints = 0;
         let deffenderAttackPoints = 0;
         function calculateAttackPoints(){
            let attackerFieldset = attackerKingdomName.children[3];
            let heroesArray = [];
            heroesArray.push(attackerFieldset.children[1]);
            heroesArray.push(attackerFieldset.children[2]);
            heroesArray.push(attackerFieldset.children[3]);
            for (const hero of heroesArray) {
               let info = hero.innerHTML.split(' - ');
               let type = info[0]
               let count = +info[1];
   
               if (count > 0) {
                  if (type === 'TANKS') {
                     attackerAttackPoints += 20 * count;
                  }
                  else if (type === 'FIGHTERS') {
                     attackerAttackPoints += 50 * count;
                  }
                  else if (type === 'MAGES') {
                     attackerAttackPoints += 70 * count;
                  }
               }
            }
   
            let deffenderFieldset = deffenderKingdomName.children[3];
            heroesArray = [];
            heroesArray.push(deffenderFieldset.children[1]);
            heroesArray.push(deffenderFieldset.children[2]);
            heroesArray.push(deffenderFieldset.children[3]);
            for (const hero of heroesArray) {
               let info = hero.innerHTML.split(' - ');
               let type = info[0]
               let count = +info[1];
   
               if (count > 0) {
                  if (type === 'TANKS') {
                     deffenderAttackPoints += 20 * count;
                  }
                  else if (type === 'FIGHTERS') {
                     deffenderAttackPoints += 50 * count;
                  }
                  else if (type === 'MAGES') {
                     deffenderAttackPoints += 70 * count;
                  }
               }
            }
         }

         calculateAttackPoints();

         if (attackerAttackPoints > deffenderAttackPoints) {
            deffenderElement.children[2].textContent = attackerElement.children[2].textContent;
         }
      }

      else {
         attackerInputFiled.value = '';
         deffenderInputField.value = '';
      }
   }
}

solve();