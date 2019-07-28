const homeController = function () {
    const homePage = function (context) {
        userModel.getAllEvents()
            .then(helper.handler)
            .then(events => {
                storage.saveEvents(events);
            });

        const loggedIn = storage.getData('userInfo') !== null;
        const hasAnyEvents = storage.getData('eventsInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        if(hasAnyEvents){
            const events = JSON.parse(storage.getData('eventsInfo'));
            context.hasAnyEvents = hasAnyEvents;
            context.events = events;
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            eventsPage: "../views/events/eventsPage.hbs"
        }).then(function () {
            this.partial('../views/home/homePage.hbs');
        })

    };

    return {
        homePage
    };
}();