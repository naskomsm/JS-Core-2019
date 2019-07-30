const homeController = function () {
    const getHome = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            try {
                let response = await eventModel.getAllEvents();
                let events = await response.json();
                context.events = events;
            } catch (e) {
                console.log(e);
            }
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            eventViewPage: "../views/event/eventViewPage.hbs"
        }).then(function () {
            this.partial('../views/home/homePage.hbs');
        })
    };

    return {
        getHome
    };
}();