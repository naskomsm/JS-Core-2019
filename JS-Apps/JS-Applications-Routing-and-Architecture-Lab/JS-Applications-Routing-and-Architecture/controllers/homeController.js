const homeController = function () {
    const getHome = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;
        const hasTeam = storage.getData('teamInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            if(hasTeam){
                const teams = JSON.parse(storage.getData('teamInfo')).teams; // ??
                context.hasTeam = hasTeam;
                context.teams = teams;
            }
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/home/home.hbs')
        })
    };

    const getAbout = function (context) {
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
            this.partial('../views/about/about.hbs')
        })
    };

    const getCatalog = function (context){
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
            this.partial('../views/catalog/teamCatalog.hbs')
        })
    };

    return {
        getHome,
        getAbout,
        getCatalog
    };
}();