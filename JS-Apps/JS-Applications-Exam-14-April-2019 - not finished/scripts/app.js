const app = Sammy("#main", function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.homePage);
    
    // Login
    this.get('#/login',userController.loginPage);
    this.post('#/login',userController.loginPost);

    // Register
    this.get('#/register',userController.registerPage);
    this.post('#/register',userController.registerPost);

    // Logout
    this.get('#/logout', userController.logout);

    // user profile
    this.get('#/user',userController.userPage);

    // organize event
    this.get('#/organize',userController.organizePage);
    this.post('#/organize',userController.organizeEvent);

    // events
    this.get('#/events',userController.eventsPage);
});

(() => {
    app.run('#/home');
})();