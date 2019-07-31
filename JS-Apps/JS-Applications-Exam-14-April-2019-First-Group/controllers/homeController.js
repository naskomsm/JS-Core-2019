const homeController = function () {
    const getHome = async function (context) {
        helper.addHeaderInfo(context);

        try {
            const response = await eventModel.getAllEvents();
            const events = await response.json();
            context.events = events;
        } catch (e) {
            console.log(e);
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