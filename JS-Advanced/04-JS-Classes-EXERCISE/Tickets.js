function solve(arrayOfStrings, sortingCriteria) {
    let tickets = [];
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    while (arrayOfStrings.length > 0) {
        let currentString = arrayOfStrings.shift().split('|');


        let givenDestination = currentString.shift();
        let givnePrice = +currentString.shift();
        let givenStatus = currentString.shift();

        let currentTicket = new Ticket(givenDestination, givnePrice, givenStatus);
        tickets.push(currentTicket);
    }

    switch (sortingCriteria) {
        case 'destination':
            return tickets.sort((a, b) => a.destination.localeCompare(b.destination));

        case 'price':
            return tickets.sort((a, b) => a.price - b.price);

        case 'status':
            return tickets.sort((a, b) => a.status.localeCompare(b.status));
    }


    // sort the array
    return tickets;
}

console.log(solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'
));

