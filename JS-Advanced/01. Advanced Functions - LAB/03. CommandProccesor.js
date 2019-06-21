function solution() {
    let string = '';

    function append(additionalString) {
        string += additionalString;
    }

    function removeStart(n) {
        string = string.substr(n);
    }

    function removeEnd(n) {
        string = string.substr(0, string.length - n);
    }

    function print() {
        console.log(string);
    }

    return {
        append,
        removeStart,
        removeEnd,
        print
    }
}

let result = solution();
result.append('123');
result.append('45');
result.removeStart(2);
result.removeEnd(1);
result.print();

