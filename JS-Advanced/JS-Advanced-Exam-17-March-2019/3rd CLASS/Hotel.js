class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingNumber = 1;

        this.rooms = {
            single: this.capacity * 0.5, // 5
            double: this.capacity * 0.3, // 3
            maisonette: this.capacity * 0.2 // 2
        }
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
        if (this.rooms[roomType] > 0) {
            let currentClientBooking = {
                clientName: clientName,
                roomType: roomType,
                nights: nights,
                roomNumber: this.currentBookingNumber
            }

            this.bookings.push(currentClientBooking);
            this.currentBookingNumber++;
            this.rooms[roomType]--;

            return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${currentClientBooking.roomNumber}.`;
        }

        else {
            let result = `No ${roomType} rooms available!`;
            for (const room in this.rooms) {
                if (this.rooms[room] > 0) {
                    result += ` Available ${room} rooms: ${this.rooms[room]}.`;
                }
            }

            return result;
        }
    }

    roomService(currentBookingNumber, serviceType) {
        let searchedBooking = this.bookings.find(x => x.roomNumber === currentBookingNumber);// retur object or undefined;
        let searchedService = this.servicesPricing.hasOwnProperty(serviceType);// return true or false

        if (searchedBooking === undefined) {
            return `The booking ${currentBookingNumber} is invalid.`;
        }

        if (searchedService === false) {
            return `We do not offer ${serviceType} service.`;
        }

        if (!searchedBooking.hasOwnProperty('services')) {
            searchedBooking['services'] = [];
        }

        searchedBooking['services'].push(serviceType);
        return `Mr./Mrs. ${searchedBooking.clientName}, Your order for ${serviceType} service has been successful.`;
    }

    checkOut(currentBookingNumber) {
        //check if is invalid booking number
        let searchedBooking = this.bookings.find(x => x.roomNumber === currentBookingNumber);// return object or undefined;
        if (searchedBooking === undefined) {
            return `The booking ${currentBookingNumber} is invalid.`;
        }

        let totalMoney =  this.roomsPricing[searchedBooking.roomType] * searchedBooking.nights;
        let totalServiceMoney = 0
        
        if (searchedBooking.hasOwnProperty('services')) {
            for (let i = 0; i < searchedBooking.services.length; i++) {
                totalServiceMoney += this.servicesPricing[searchedBooking.services[i]];
            }
        }
        
        this.rooms[searchedBooking.roomType]++;
        let index = this.bookings.indexOf(searchedBooking);
        this.bookings.splice(index,1);

        if (totalServiceMoney > 0){
            return `We hope you enjoyed your time here, Mr./Mrs. ${searchedBooking.clientName}. The total amount of money you have to pay is ${totalMoney + totalServiceMoney} BGN. You have used additional room services, costing ${totalServiceMoney} BGN.`;
        }
        
        return `We hope you enjoyed your time here, Mr./Mrs. ${searchedBooking.clientName}. The total amount of money you have to pay is ${totalMoney} BGN.`;
    }

    report() { // here was the problem...
        let report = [];
        report.push(`${this.name.toUpperCase()} DATABASE:`);
        report.push('--------------------');
 
        if (this.bookings.length === 0) {
            report.push('There are currently no bookings.');
            return report.join('\n');
        }
        for (let i = 0; i < this.bookings.length; i++) {
            let client = this.bookings[i];
            report.push(`bookingNumber - ${client.roomNumber}`);
            report.push(`clientName - ${client.clientName}`);
            report.push(`roomType - ${client.roomType}`);
            report.push(`nights - ${client.nights}`);
 
            if (client.hasOwnProperty('services') && client.services.length) {
                report.push(`services: ${client.services.join(', ')}`);
            }
            report.push(`----------`)
        }
        report.pop();
        return report.join('\n');
    }
}