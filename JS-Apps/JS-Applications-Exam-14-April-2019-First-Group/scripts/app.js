const app = Sammy("#rootElement", function () {
    this.use('Handlebars', 'hbs');
    
    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/logout', userController.logout);

    // Events
    this.get('#/createEvent',eventController.getCreateEvent);
    this.post('#/createEvent',eventController.postCreateEvent);

        // Details
    this.get('#/eventDetails/:id',eventController.getDetailsEvent);

        // Edit
    this.get('#/editEvent/:id',eventController.getEditEvent);
    this.post('#/editEvent/:id',eventController.postEditEvent);

        // Delete
    this.get('#/deleteEvent/:id',eventController.deleteEventPost);

});

(() => {
    app.run('#/home');
})();