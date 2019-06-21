function solve() {
    let keysCount = {};
    
    for (let i = 0; i < arguments.length; i++) {
        let key = typeof arguments[i];
        let value = arguments[i];
        console.log(`${key}: ${value}`);

        if (!keysCount.hasOwnProperty(key)) {
            keysCount[key] = 1;
        } else {
            keysCount[key]++;
        }
    }

    // with obj it will be smth like
    // typeCounter = Object.entries(typeCounter).sort((a,b) => b[1] - a[1])).foreach(element => { console.log(`${..} = ${..}`) })


    var sortable = [];
    for (var string in keysCount) {
        sortable.push([string, keysCount[string]]);
    }

    sortable.sort((a,b) => b[1] - a[1]);
    
    for (const pair of sortable) {
        console.log(`${pair[0]} = ${pair[1]}`);
    }
}

solve({ name: 'bob' }, 3.333, 9.999);