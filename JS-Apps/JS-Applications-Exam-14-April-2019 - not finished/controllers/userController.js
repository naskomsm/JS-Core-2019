const userController = function () {
    const loginPage = function (context) {
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
            this.partial('../views/login/loginPage.hbs');
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

    const registerPage = function (context) {
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
            this.partial('../views/register/registerPage.hbs');
        })
    };

    const registerPost = function (context) {
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

    const userPage = function (context) {
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
            this.partial('../views/user/userInfo.hbs');
        })
    };

    const organizePage = function (context) {
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
            this.partial('../views/events/organizeEventPage.hbs');
        })
    }

    const organizePost = function (context) {
        userModel.saveEvent(context.params)
            .then(helper.handler)
            .then(userController.eventsPage(context));
    };

    return {
        loginPage,
        loginPost,
        registerPage,
        registerPost,
        userPage,
        logout,
        organizePage,
        organizePost,
    };
}();