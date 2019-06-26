class List {
    constructor() {
        this.array = [];
        this.size = 0;
    }

    add(number) {
        this.array.push(number);
        this.array.sort((a, b) => a - b);
        this.size++;
    }

    remove(index) {
        if (index < this.array.length && index >= 0) {
            this.array.splice(index, 1);
            this.size--;
            this.array.sort((a, b) => a - b);
        }
    }

    get(index) {
        if (index < this.array.length && index >= 0) {
            return this.array[index];
        }
    }
}

let list = new List();
list.add(5);
list.add(3);
list.remove(0);
console.log(list.size);
