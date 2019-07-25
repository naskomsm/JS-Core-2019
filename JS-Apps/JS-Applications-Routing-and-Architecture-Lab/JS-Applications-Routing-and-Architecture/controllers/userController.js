const userController = function () {
    const loginPage = function (context) {
        // loads the header and footer into the login.hbs then calls the login.hbs
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () { this.partial('../views/login/loginPage.hbs') });
    };

    const registerPage = function (context) {
        // loads the header and footer into the login.hbs then calls the login.hbs
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () { this.partial('../views/register/registerPage.hbs') });
    };

    const registerPost = function (context) {
        userModel.register(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveUser(data);
                homeController.homePage(context);
            })
    };

    const loginPost = function (context) {
        userModel.login(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveUser(data);
                homeController.homePage(context);
            })
    };

    const logout = function (context) {
        userModel.logout()
            .then(helper.handler)
            .then(() => {
                storage.deleteUser();
                homeController.homePage(context);
            });
    };

    return {
        loginPage,
        registerPage,
        registerPost,
        loginPost,
        logout
    };
}();