const homeController = function () {
    const homePage = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;
        
        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        // loads the header and footer into the home.hbs then calls the home.hbs
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () { this.partial('../views/home/home.hbs') });
    };  

    const aboutPage = function(context){
        const loggedIn = storage.getData('userInfo') !== null;
        
        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        // loads the header and footer into the about.hbs then calls the about.hbs
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () { this.partial('../views/about/about.hbs') });
    };

    const catalogPage = function(context){
        const loggedIn = storage.getData('userInfo') !== null;
        
        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        // ????
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
            team: '../views/catalog/team.hbs'
        }).then(function () { this.partial('../views/catalog/teamCatalog.hbs') });
    };
    
    return {
        homePage,
        aboutPage,
        catalogPage
    };
}();