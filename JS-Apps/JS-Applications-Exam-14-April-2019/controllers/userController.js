const userController = function () {
    const getLogin = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/loginPage.hbs');
        })
    };

    const postLogin = function (context) {
        helper.notify('loading');
        userModel.login(context.params)
            .then(helper.handler)
            .then(data => {
                helper.stopNotify();
                helper.notify('success', 'You just logged-in!');
                storage.saveUser(data);
                homeController.homePage(context);
            })
    };

    const getRegister = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/registerPage.hbs');
        })
    };

    const postRegister = function (context) {
        userModel.register(context.params)
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
        getLogin,
        postLogin,
        getRegister,
        postRegister,
        logout
    };
}();