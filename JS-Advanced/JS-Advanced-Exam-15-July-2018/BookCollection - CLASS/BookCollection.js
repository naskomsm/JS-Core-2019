class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        if (room !== 'livingRoom' && room !== 'bedRoom' && room !== 'closet') {
            throw new Error(`Cannot have book shelf in ${room}`);
        }

        this.shelf = [];
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelfCapacity = shelfCapacity;
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length
    }

    addBook(bookName, bookAuthor, genre = '') {
        let book = {
            bookName,
            bookAuthor,
            genre: genre
        }

        if (this.shelf.length === this.shelfCapacity) {
            this.shelf.shift();
            this.shelf.unshift(book);
        }
        else {
            this.shelf.push(book);
        }

        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
        return this;
    }

    throwAwayBook(bookName) {
        this.shelf = this.shelf.filter(b => b.bookName !== bookName);
    }

    showBooks(genre) {
        let searchedBooks = this.shelf.filter(x => x.genre === genre);

        let info = [];
        info.push(`Results for search "${genre}":`);

        for (const book of searchedBooks) {
            info.push(`\uD83D\uDCD6 ${book.bookAuthor} - "${book.bookName}"`)
        }

        return info.join('\n');
    }

    toString() {
        if (this.shelf.length === 0) {
            return 'It\'s an empty shelf';
        }

        let info = [];
        info.push(`"${this.shelfGenre}" shelf in ${this.room} contains:`);

        for (const book of this.shelf) {
            info.push(`\uD83D\uDCD6 "${book.bookName}" - ${book.bookAuthor}`)
        }

        return info.join('\n');
    }
}