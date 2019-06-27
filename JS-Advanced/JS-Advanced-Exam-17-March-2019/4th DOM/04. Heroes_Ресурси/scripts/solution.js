function solve(){
      let kingdomField = document.getElementsByTagName('input')[0];
      let kingField = document.getElementsByTagName('input')[1];
      let rebuildButton = document.getElementsByTagName('button')[0];
      rebuildButton.addEventListener('click',onclick);

      const validKingdomNames = ['CASTLE','DUNGEON','FORTRESS','INFERNO','NECROPOLIS','RAMPART','STRANGHOLD','TOWER','CONFLUX'];

      function onclick(){
         
         if(kingField.value.length >= 2 && validKingdomNames.includes(kingdomField.value.toUpperCase())){
            // to do
         }
      }
}



