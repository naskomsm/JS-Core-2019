class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingN
    }

    get roomsPricing() {
        return {
            single: 50,
            double: 90,
            maisonette: 135
        }
    }

    get servicesPricing() {
        return {
            food: 10,
            drink: 15,
            housekeeping: 25
        }
    }

    rentARoom(clientName, roomType, nights) {
        let result = '';

        let roomsAvailable = {
            single: this.capacity - (this.capacity * 0.5),
            double: this.capacity - (this.capacity * 0.3),
            maisonette: this.capacity - (this.capacity * 0.2)
        }

        if (roomsAvailable[roomType] > 0) {
            let currentClientBooking = {
                clientName: clientName,
                roomType: roomType,
                nights: +nights,
                roomNumber: this.currentBookingNumber
            }

            roomsAvailable[roomType]--;
            this.bookings.push(currentClientBooking);
            result += `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber++}.`;
        }
        else {
            result += `No ${roomType} rooms available!`;
            //to do
        }
        return result;
    }
}

let hotel = new Hotel('zdr', 2);
console.log(hotel.rentARoom('atanas', 'double', 2));
console.log(hotel.rentARoom('atanas', 'double', 2));
