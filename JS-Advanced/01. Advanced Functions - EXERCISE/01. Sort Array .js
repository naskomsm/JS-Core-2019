function sort(array, sortType) {
    if (sortType === 'asc') {
        return array.sort((acc, curr) => acc - curr);
    }
    else if (sortType === 'desc') {
        return array.sort((acc, curr) => curr - acc);
    }
}

sort([14, 7, 17, 6, 8], 'asc');