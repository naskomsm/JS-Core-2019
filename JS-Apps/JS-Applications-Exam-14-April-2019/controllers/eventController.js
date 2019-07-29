const eventController = function () {
    const createEventPage = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/event/createEvent.hbs');
        });
    };

    const createEventPost = function (context) {
        eventModel.createEvent(context.params)
            .then(helper.handler)
            .then(() => {
                //notify for success
                homeController.homePage(context);
            });
    };

    const detailsEventPage = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        let response = await eventModel.getEvent(context.params.id);
        let event = await response.json();

        const isCreator = JSON.parse(storage.getData('userInfo')).username === event.organizer;

        context.event = event;
        context.isCreator = isCreator;

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/event/detailsEvent.hbs');
        });
    };

    const editEventPage = async function (context) {
        let response = await eventModel.getEvent(context.params.id);
        let event = await response.json();

        context.event = event;

        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/event/editEvent.hbs');
        });
    };

    const editEventPost = function (context) {
        eventModel.editEvent(context.params)
            .then(helper.handler)
            .then(homeController.homePage(context));
    };

    const deleteEventPost = function (context) {
        eventModel.deleteEvent(context.params.id)
            .then(helper.handler)
            .then(homeController.homePage(context));
    };

    return {
        createEventPage,
        createEventPost,
        detailsEventPage,
        editEventPage,
        editEventPost,
        deleteEventPost
    }
}();