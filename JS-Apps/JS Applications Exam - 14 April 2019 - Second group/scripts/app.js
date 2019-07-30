const app = Sammy("#rootElement", function () {
    this.use('Handlebars', 'hbs');
    
    // Home
    this.get('#/home',homeController.getHome);

    // User
    this.get('#/login',userController.getLogin);
    this.get('#/register',userController.getRegister);

    this.post('#/login',userController.postLogin);
    this.post('#/register',userController.postRegister);

    this.get('#/logout',userController.logout);

    // Cinema
    this.get('#/cinema',cinemaController.getCinema);
    this.get('#/myMovies',cinemaController.getMyMovies);

    // Create
    this.get('#/addMovie',cinemaController.getAddMovie);
    this.post('#/addMovie',cinemaController.postAddMovie);
    
    // Edit
    this.get('#/myMovies/edit/:id',cinemaController.getEditMovie);
    this.post('#/myMovies/edit/:id',cinemaController.postEditMovie);

    // Delete
    this.get('#/myMovies/delete/:id',cinemaController.postDeleteMovie);

    // Details
    this.get('#/myMovies/details/:id',cinemaController.getDetailsMovie);

    // Tickets
    this.get('#/buyTicket/:id',cinemaController.postBuyTicket);
});

(() => {
    app.run('#/home');
})();