class List{
    constructor(){
        this.array = [];
    }

    add(number){
        this.array.push(number);
    }

    remove(index){
        this.array.splice(index,1);
    }

    get(index){
        return this.array[index];
    }

    get size(){
        return this.array.length;
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.size);
