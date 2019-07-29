const app = Sammy("#rootElement", function () {
    this.use('Handlebars', 'hbs');
    
    // Home
    this.get('#/home', homeController.homePage);

    // User
    this.get('#/login', userController.loginPage);
    this.post('#/login', userController.loginPost);

    this.get('#/register', userController.registerPage);
    this.post('#/register', userController.registerPost);

    this.get('#/logout', userController.logout);

    // Events
    this.get('#/createEvent',eventController.createEventPage);
    this.post('#/createEvent',eventController.createEventPost);

    this.get('#/eventDetails/:id',eventController.detailsEventPage);

    this.get('#/editEvent/:id',eventController.editEventPage);

    this.post('#/editEvent/:id',eventController.editEventPost);
    this.get('#/deleteEvent/:id',eventController.deleteEventPost);

});

(() => {
    app.run('#/home');
})();