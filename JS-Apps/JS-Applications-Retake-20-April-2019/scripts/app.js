const app = Sammy("#rooter", function () {
    this.use('Handlebars', 'hbs');
    
    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/logout', userController.logout);
    this.get('#/userInfo',userController.getUserInfo);

    // Recipe
    this.get('#/create',recipeController.getCreate);
    this.post('#/create',recipeController.postCreate);

    this.get('#/recipe/:id',recipeController.getRecipe);

    // Edit
    this.get('#/edit/:id',recipeController.getEdit);
    this.post('#/edit/:id',recipeController.postEdit);

    // Delete
    this.get('#/delete/:id',recipeController.deleteRecipe);

    // Likes
    this.get('#/like/:id',recipeController.like);
});

(() => {
    app.run('#/home');
})();