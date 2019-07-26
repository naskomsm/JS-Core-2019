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

    const eventsPage = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;
        const hasAnyEvents = storage.getData('eventInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.hasAnyEvents = hasAnyEvents;

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            eventNotFoundPage: "../views/events/eventNotFoundPage.hbs",
            events: userModel.getEvents(context.params)

        }).then(function () {
            this.partial('../views/events/eventsPage.hbs');
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
    };

    const organizeEvent = function (context) {
        userModel.saveEvent(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveEvent(data);
                userController.eventsPage(context);
            });
    };

    return {
        loginPage,
        loginPost,
        registerPage,
        registerPost,
        userPage,
        organizePage,
        eventsPage,
        organizeEvent,
        logout
    };
}();