const offerController = function () {
    const getCreate = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        }).then(function () {
            this.partial('../views/offer/createPage.hbs');
        })
    };

    const postCreate = function (context) {
        offerModel.create(context.params)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home');
            });
    };

    const getDashboard = async function (context) {
        helper.addHeaderInfo(context);

        try {
            let response = await offerModel.getOffers();
            let offers = await response.json();

            context.offers = offers;
        } catch (e) {
            console.log(e);
        }

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/offer/dashboardPage.hbs');
        })
    };

    const getDetails = async function (context) {
        helper.addHeaderInfo(context);

        let response = await offerModel.getOffer(context.params.id);
        let offer = await response.json();

        context.offer = offer;

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'
        }).then(function () {
            this.partial('../views/offer/detailsPage.hbs');
        });
    };

    const getEdit = async function (context) {
        helper.addHeaderInfo(context);

        let response = await offerModel.getOffer(context.params.id);
        let offer = await response.json();

        context.offer = offer;

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/offer/editPage.hbs');
        })
    };

    const postEdit = function (context) {
        offerModel.editOffer(context.params)
            .then(helper.handler)
            .then(context.redirect('#/home'));
    };

    const postDelete = function (context) {
        offerModel.deleteOffer(context.params.id)
            .then(helper.handler)
            .then(context.redirect('#/home'));
    };

    return {
        getCreate,
        postCreate,
        getDashboard,
        getDetails,
        getEdit,
        postEdit,
        postDelete,
    };
}();