function solve(){
      let kingdomField = document.getElementsByTagName('input')[0];
      let kingField = document.getElementsByTagName('input')[1];
      
      const validKingdomNames = ['CASTLE','DUNGEON','FORTRESS','INFERNO','NECROPOLIS','RAMPART','STRANGHOLD','TOWER','CONFLUX'];

      let rebuildButton = document.getElementsByTagName('button')[0];
      rebuildButton.addEventListener('click',rebuildOnClick);
      function rebuildOnClick(){
         if(kingField.value.length >= 2 && validKingdomNames.includes(kingdomField.value.toUpperCase())){
            let id = kingdomField.value.toLowerCase();
            let element = document.getElementById(id);
            element.style.display = 'inline-block';

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
      }

      let joinButton = document.getElementsByTagName('button')[1];
      joinButton.addEventListener('click',joinKingdom);
      function joinKingdom(){
         // check if nothing is selected -> do nothing
         // check characterName -> string.length >= 2
         // the kingdom joined needs to be valid and also kingdom must have been rebuilt

         let isEverythingOk = true;

         let allRadioCheckers = document.getElementsByName('characterType');
         if(allRadioCheckers[0].checked === false && allRadioCheckers[1].checked === false && allRadioCheckers[2].checked === false){
            isEverythingOk = false;
         }

         let charactersSection = document.getElementById('characters');
         let lastDiv = charactersSection.children[3];

         let characterInput = lastDiv.children[0]; // charName
         let kingdomInput = lastDiv.children[1]; // kingdomName

         if(characterInput.value.length < 2){
            isEverythingOk = false;
         }

         if(!validKingdomNames.includes(kingdomInput.value.toUpperCase())){
            isEverythingOk = false;
         }

         let id = kingdomInput.value.toLowerCase();
         let element = document.getElementById(id);
         if(element.style.display === 'none'){
            isEverythingOk = false;
         }

         if(isEverythingOk){
            let fieldsetInfo = element.children[3];
            
            if(allRadioCheckers[0].checked){
               let fighterParagraph = fieldsetInfo.children[2];
               let text = fighterParagraph.textContent.split(' - ');

               let type = text[0]; // TANKS
               let count = +text[1]; // 0
               count++;

               fighterParagraph.textContent = `${type} - ${count}`;
            }
            else if(allRadioCheckers[1].checked){
               let mageParagraph = fieldsetInfo.children[3];
               let text = mageParagraph.textContent.split(' - ');

               let type = text[0]; // mages
               let count = +text[1]; // 0
               count++;

               mageParagraph.textContent = `${type} - ${count}`;
            }
            else if(allRadioCheckers[2].checked){
               let tankParagraph = fieldsetInfo.children[1];
               let text = tankParagraph.textContent.split(' - ');

               let type = text[0]; // fighters
               let count = +text[1]; // 0
               count++;

               tankParagraph.textContent = `${type} - ${count}`;
            }

            let divArmyOutput = fieldsetInfo.children[4];

            let result = divArmyOutput.textContent.split(' ');
            result.push(characterInput.value);

            divArmyOutput.textContent = result.join(' ');
         }
      }

      let attackButton = document.getElementsByTagName('button')[0];
      attackButton.addEventListener('click',attackOnClick);
      function attackOnClick(){
         let isEverythingOk = true;
         
         let actionsSection = document.getElementById('actions');

         let attacker = actionsSection.children[1];
         let deffender = actionsSection.children[2];

         if(!validKingdomNames.includes(attacker.value.toUpperCase()) || !validKingdomNames.includes(deffender.value.toUpperCase())){
            isEverythingOk = false;
         }

         let idOfAttacker = attacker.value.toLowerCase();
         let element = document.getElementById(idOfAttacker);

         let idOfDeffender = deffender.value.toLowerCase();
         let element2 = document.getElementById(idOfDeffender);

         if(element.style.display === 'none' || element2.style.display === 'none'){
            isEverythingOk = false;
         }

         if(isEverythingOk){
            let attackerKingdom = document.getElementById(attacker.value);
            let deffenderKingdom = document.getElementById(deffender.value);

            let attackerAttackPoints = 0;
            let attackerFieldset = attackerKingdom.children[3];
            let heroesArray = [];
            heroesArray.push(attackerFieldset.children[1]);
            heroesArray.push(attackerFieldset.children[2]);
            heroesArray.push(attackerFieldset.children[3]);
            for (const hero of heroesArray) {
               let info = hero.split(' - ');
               let type = info[0]   
               let count = +info[1];

               if(count > 0){
                  if(type === 'TANKS'){
                     attackerAttackPoints += 20 * count;
                     attackerdeffencePoints += 80 * count;
                  }
                  else if(type === 'FIGHTERS'){
                     attackerAttackPoints += 50 * count;
                     attackerdeffencePoints += 50 * count;
                  }
                  else if(type === 'MAGES'){
                     attackerAttackPoints += 70 * count;
                     attackerdeffencePoints += 30 * count;
                  }
               }
            }

            let deffenderAttackPoints = 0;
            let deffenderFieldset = deffenderKingdom.children[3];
            heroesArray = [];
            heroesArray.push(deffenderFieldset.children[1]);
            heroesArray.push(deffenderFieldset.children[2]);
            heroesArray.push(deffenderFieldset.children[3]);
            for (const hero of heroesArray) {
               let info = hero.split(' - ');
               let type = info[0]   
               let count = +info[1];

               if(count > 0){
                  if(type === 'TANKS'){
                     deffenderAttackPoints += 20 * count;
                     deffenderdeffencePoints += 80 * count;
                  }
                  else if(type === 'FIGHTERS'){
                     deffenderAttackPoints += 50 * count;
                     deffenderdeffencePoints += 50 * count;
                  }
                  else if(type === 'MAGES'){
                     deffenderAttackPoints += 70 * count;
                     deffenderdeffencePoints += 30 * count;
                  }
               }
            }


            if(attackerAttackPoints > deffenderAttackPoints){
               element2.children[2].textContent = elemet.children[1].textContent; 
            }
         }
      }
}

solve();