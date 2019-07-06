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
}