function SortedList() {
    let numbers = [];
    function _orderNumbersAscending() {
        numbers.sort((a, b) => a - b);
    }
    
    return {
        size: 0,
        add(element) {
            numbers.push(element);
            _orderNumbersAscending();
            this.size++;
    
            return numbers;
        },
        remove(index) {
            if (index >= numbers.length || index < 0) {
                throw new Error('Index out of range');
            }
    
            numbers.splice(index, 1);
            _orderNumbersAscending();
            this.size--;
    
            return numbers;
        },
         get(index) {
            if (index >= numbers.length || index < 0) {
                throw new Error('Index out of range');
            }
    
            return numbers[index];
        }
    }
}