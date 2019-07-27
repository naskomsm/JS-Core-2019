const homeController = function () {
    const homePage = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        userModel.getEvents(context.params)
            .then(helper.handler)
            .then(allEvents => {
                context.events = allEvents;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                    eventsPage: "../views/events/eventsPage.hbs"
                }).then(function () {
                    this.partial('../views/home/homePage.hbs');
                })
            });
    };

    return {
        homePage
    };
}();