function tableFilter(matrix, commands) {
    let command = commands.split(' ')[0];

    let header = matrix[0]; // name,age,grade
    let headerCol = commands.split(" ")[1]; // just getting some of them to get the start indexx
    let index = header.indexOf(headerCol); // the start index

    let people = matrix.slice(1);

    if (command === 'hide') {
        header = header.filter(x => x !== headerCol);
        people = people.filter((x=>x.splice(index,1)));
    }

    else if (command === 'sort') {
        people = people.sort((a, b) => a[index].localeCompare(b[index]));
    }

    else if (command === 'filter') {
        let value = commands.split(" ")[2];
        people = people.filter(x => x[index] === value);
    }

    console.log(header.join(' | '));
    for (let person of people) {
        console.log(person.join(' | '));
    }
}


tableFilter([['firstName', 'age', 'grade', 'course'],
['Peter', '25', '5.00', 'JS-Core'],
['George', '34', '6.00', 'Tech'],
['Marry', '28', '5.49', 'Ruby']],
'filter firstName Marry'
);