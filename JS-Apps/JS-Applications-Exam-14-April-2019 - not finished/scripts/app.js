const app = Sammy("#main", function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.homePage);

    // Login
    this.get('#/login', userController.loginPage);
    this.post('#/login', userController.loginPost);

    // Register
    this.get('#/register', userController.registerPage);
    this.post('#/register', userController.registerPost);

    // Logout
    this.get('#/logout', userController.logout);

    // user profile
    this.get('#/user', userController.userPage);

    // events
    this.get('#/organize', userController.organizePage);
    this.post('#/organize', userController.organizePost);
    
    this.get('#/:id',userController.handleEventDetails);

    this.get('#/:id/edit',userController.editPage);
    this.post('#/:id/edit',userController.editPut);

    this.get('#/:id/delete',userController.deleteEvent);
});

(() => {
    app.run('#/home');
})();