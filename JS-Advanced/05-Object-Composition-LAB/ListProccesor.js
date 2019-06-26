function listProccesor(array) {
    let result = [];

    let object = {
        add: function (string) {
            result.push(string);
        },

        remove: function (string) {
            result = result.filter(x => x !== string);
        },

        print: function () {
            console.log(result.join(','));
        }
    }

    for (const input of array) {
        let [command, string] = input.split(' ');
        switch (command) {
            case 'add': object.add(string)
                break;
            case 'remove': object.remove(string)
                break;
            case 'print': object.print()
                break;
        }
    }

    return object
}

listProccesor(['add pesho', 'add george', 'add peter', 'remove peter','print']);