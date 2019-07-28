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
        let userId;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            userId = JSON.parse(storage.getData('userInfo'))._id;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        userModel.getAllEvents()
            .then(helper.handler)
            .then(events => {
                storage.saveCurrentUserEvents(events.filter(event => event._acl.creator == userId))
            }); 

        const currentUserEvents = JSON.parse(storage.getData('currentUserEvents'));
        const currentUserEventsCount = JSON.parse(storage.getData('currentUserEvents')).length;
        context.currentUserEventsCount = currentUserEventsCount;
        context.currentUserEvents = currentUserEvents;

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
        userModel.eventPost(context.params)
            .then(helper.handler)
            .then(homeController.homePage(context));
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