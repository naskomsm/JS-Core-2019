class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.products = [];
    }

    get clientId() {
        return this._clientId;
    }

    set clientId(clientId) {
        const pattern = /^\d{6}$/;

        if (!pattern.test(clientId)) {
            throw new TypeError('Client ID must be a 6-digit number');
        }

        this._clientId = clientId;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        const pattern = /^\w+@[\w\\.]+$/;

        if (!pattern.test(email)) {
            throw new TypeError('Invalid e-mail');
        }

        this._email = email;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        if (firstName.length < 3 || firstName.length > 20) {
            throw new TypeError('First name must be between 3 and 20 characters long');
        }

        const pattern = /^[A-Za-z]+$/;

        if (!pattern.test(firstName)) {
            throw new TypeError('First name must contain only Latin characters');
        }

        this._firstName = firstName;
    }

    get lastName() {
        return this._secondName;
    }

    set lastName(secondName) {
        if (secondName.length < 3 || secondName.length > 20) {
            throw new TypeError('Last name must be between 3 and 20 characters long');
        }

        const pattern = /^[A-Za-z]+$/;

        if (!pattern.test(secondName)) {
            throw new TypeError('Last name must contain only Latin characters');
        }

        this._secondName = secondName;
    }
}