const app = Sammy("#main", function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home',homeController.homePage);
    
    // About
    this.get('#/about',homeController.aboutPage);

    // Catalog
    this.get('#/catalog',homeController.catalogPage);
    
    // Login
    this.get('#/login',userController.loginPage);
    this.post('#/login',userController.loginPost);

    // Register
    this.get('#/register',userController.registerPage);
    this.post('#/register',userController.registerPost);

    // Logout
    this.get('#/logout', userController.logout);
});

(() => {
    app.run('#/home');
})();