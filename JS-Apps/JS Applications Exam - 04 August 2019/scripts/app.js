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

    // Create offer
    this.get('#/create',offerController.getCreate);
    this.post('#/create',offerController.postCreate);

    // Dashboard
    this.get('#/dashboard',offerController.getDashboard);

    // Details
    this.get('#/dashboard/details/:id',offerController.getDetails);

    // Edit
    this.get('#/dashboard/edit/:id',offerController.getEdit);
    this.post('#/dashboard/edit/:id',offerController.postEdit);

    // Delete
    this.get('#/dashboard/delete/:id',offerController.postDelete);

    // Profile
    this.get('#/profile',userController.getUserInfo);

    // Buy
    this.get('#/dashboard/buy/:id',userController.buyOffer);

});

(() => {
    app.run('#/home');
})();