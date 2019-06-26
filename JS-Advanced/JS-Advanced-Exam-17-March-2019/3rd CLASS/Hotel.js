class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingNumber = 1;
        this._roomsAvailable = {
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
        let result = '';

        if (this._roomsAvailable[roomType] > 0) {
            let currentClientBooking = {
                clientName: clientName,
                roomType: roomType,
                nights: +nights,
                roomNumber: this.currentBookingNumber
            }

            this._roomsAvailable[roomType]--; // here is the problem
            this.bookings.push(currentClientBooking);
            result += `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber++}.`;
        }
        else { 
            result += `No ${roomType} rooms available! `;
            for (const key in this._roomsAvailable) {
                if(key === roomType){
                    continue;
                }
                result += `Available ${key} rooms: ${this._roomsAvailable[key]}. `;
            }
        }
        return result.trim();
    }

    roomService(currentBookingNumber,serviceType){
        let searchedBooking = this.bookings.find(x=>x.roomNumber === currentBookingNumber);// retur object or undefined;
        let searchedService =  this.servicesPricing.hasOwnProperty(serviceType);// return true or false

        if(searchedBooking === undefined){
            return `The booking ${currentBookingNumber} is invalid.`;
        }

        if(searchedService === false){
            return `We do not offer ${serviceType} service.`;
        }

        if(!searchedBooking.hasOwnProperty('services')){
            searchedBooking.services = [];
        }

        searchedBooking['services'].push(serviceType);
        return `Mr./Mrs. ${searchedBooking.clientName}, Your order for ${serviceType} service has been successful.`;
    }

    checkOut(currentBookingNumber){
        //check if is invalid booking number
        let searchedBooking = this.bookings.find(x=>x.roomNumber === currentBookingNumber);// retur object or undefined;
        if(searchedBooking === undefined){
            return `The booking ${currentBookingNumber} is invalid.`;
        }

        let totalPrice = 0;
        let totalServiceMoney = 0
        this._roomsAvailable[searchedBooking.roomType]++;

        let result = '';

        if(searchedBooking.roomType === 'single'){
            totalPrice += 50 * searchedBooking.nights;
        }
        else if(searchedBooking.roomType === 'double'){
            totalPrice += 90 * searchedBooking.nights;
        }
        else if(searchedBooking.roomType === 'maisonette'){
            totalPrice += 135 * searchedBooking.nights;
        }

        result += `We hope you enjoyed your time here, Mr./Mrs. ${searchedBooking.clientName}. The total amount of money you have to pay is ${totalPrice} BGN.`;

        if(searchedBooking.hasOwnProperty('services')){
            for (const service of searchedBooking.services) {
                if(service === 'food') totalServiceMoney += 10;
                else if(service === 'drink') totalServiceMoney += 15;
                else if(service === 'housekeeping') totalServiceMoney += 25;
            }

            result += ` You have used additional room services, costing ${totalServiceMoney} BGN.`;
        }

        return result;
    }

    report(){
        let result = `${this.name.toUpperCase()} DATABASE:\n`;
        result += '--------------------\n';
        if(this.bookings.length === 0){
            result += `There are currently no bookings.\n`;
            return result;
        }

        for (const person of this.bookings) {
            result += `bookingNumber – ${person.roomNumber}\n`;
            result += `clientName – ${person.clientName}\n`
            result += `roomType – ${person.roomType}\n`;
            result += `nights – ${person.nights}\n`;
            
            if(person.hasOwnProperty('services')){
                result += `services: `;
                result += person.services.join(', ');
                result += '\n';
            }
            
            result += `----------\n`;
        }

        return result;
    }
}

let hotel = new Hotel('HotUni', 10);
hotel.rentARoom('Peter', 'single', 4);
hotel.rentARoom('Robert', 'double', 4);
hotel.rentARoom('Geroge', 'maisonette', 6);

hotel.roomService(3, 'housekeeping');
hotel.roomService(3, 'drink');
hotel.roomService(2, 'room');
console.log(hotel.report());
