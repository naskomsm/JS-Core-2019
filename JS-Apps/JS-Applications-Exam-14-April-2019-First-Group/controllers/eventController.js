const eventController = function () {
    const getCreateEvent = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/event/createEvent.hbs');
        });
    };

    const postCreateEvent = function (context) {
        eventModel.createEvent(context.params)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home')
            });
    };

    const getDetailsEvent = async function (context) {
        helper.addHeaderInfo(context);

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

    const getEditEvent = async function (context) {
        helper.addHeaderInfo(context);

        let response = await eventModel.getEvent(context.params.id);
        let event = await response.json();

        context.event = event;

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/event/editEvent.hbs');
        });
    };

    const postEditEvent = function (context) {
        eventModel.editEvent(context.params)
            .then(helper.handler)
            .then(context.redirect('#/home'));
    };

    const deleteEventPost = function (context) {
        eventModel.deleteEvent(context.params.id)
            .then(helper.handler)
            .then(context.redirect('#/home'));
    };

    const joinEvent = async function (context) {
        helper.addHeaderInfo(context);

        let response = await eventModel.getEvent(context.params.id);
        let event = await response.json();

        eventModel.joinEvent(event)
            .then(helper.handler)
            .then(context.redirect('#/home'));
    };

    return {
        getCreateEvent,
        postCreateEvent,
        getDetailsEvent,
        getEditEvent,
        postEditEvent,
        deleteEventPost,
        joinEvent
    }
}();