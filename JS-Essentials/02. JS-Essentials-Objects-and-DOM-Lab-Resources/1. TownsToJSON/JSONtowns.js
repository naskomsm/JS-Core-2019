function solve(array){
    let mainStatistics = array.shift().split('|');

    let finalResult = [];
    
    while(array.length > 0){
        let result = {};
    
        result["Town"] = '';
        result["Latitude"] = 0;
        result["Longitude"] = 0;
        
        let currentTown = array.shift().split('|').filter((item) => item != '');;
        let town = currentTown[0].replace(currentTown[0][0],'');
        town = town.substring(0, town.length - 1);
        result["Town"] = town;
        result["Latitude"] = Number(currentTown[1]);
        result["Longitude"] = Number(currentTown[2]);

        finalResult.push(result);
    }

    let print = JSON.stringify(finalResult);
    console.log(print);
}

solve(['| Town | Latitude | Longitude |',
'| Veliko Turnovo | 43.0757 | 25.6172 |',
'| Monatevideo | 34.50 | 56.11 |']
);