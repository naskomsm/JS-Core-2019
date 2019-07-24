const userController = function () {
    const getLogin = function (context) {
        context.loadPartials({
            header: "../Views/common/header.hbs",
            footer: "../Views/common/footer.hbs"
        }).then(function () {
            this.partial('../Views/login/loginPage.hbs')
        })
    };

    const getRegister = function (context) {
        context.loadPartials({
            header: "../Views/common/header.hbs",
            footer: "../Views/common/footer.hbs"
        }).then(function () {
            this.partial('../Views/register/registerPage.hbs')
        })
    };

    const postRegister = function (context) {
        userModel.register(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveUser(data);
                homeController.getHome(context);
            })
    };

    const postLogin = function (context) {
        userModel.login(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveUser(data);
                homeController.getHome(context);
            })
    };

    const logout = function (context) {
        userModel.logout()
            .then(helper.handler)
            .then(() => {
                storage.deleteUser();
                homeController.getHome(context);
            });
    };

    return {
        getLogin,
        getRegister,
        postRegister,
        postLogin,
        logout
    };
}();