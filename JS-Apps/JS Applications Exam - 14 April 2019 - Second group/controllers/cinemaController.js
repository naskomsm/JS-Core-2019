const cinemaController = function () {
    const getCinema = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        try {
            let response = await cinemaModel.getMyMovies();
            let movies = await response.json();

            context.movies = movies;
        } catch (e) {
            console.log(e);
        }

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
        }).then(function () {
            this.partial('./views/movie/cinemaPage.hbs');
        })
    };

    const getMyMovies = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        try {
            let response = await cinemaModel.getMyMovies();
            let movies = await response.json();

            const userId = JSON.parse(storage.getData('userInfo'))._id
            context.movies = movies.filter(x => x._acl.creator === userId);
        } catch (e) {
            console.log(e);
        }

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
        }).then(function () {
            this.partial('./views/movie/myMoviesPage.hbs');
        })
    };

    const getAddMovie = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
        }).then(function () {
            this.partial('./views/movie/addMoviePage.hbs');
        })
    };

    const postAddMovie = function (context) {
        cinemaModel.addMovie(context.params)
            .then(helper.handler)
            .then(data => {
                cinemaController.getMyMovies(context);
            })
    };

    const getEditMovie = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        let response = await cinemaModel.getMovie(context.params.id);
        let movie = await response.json();

        context.movie = movie;

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs',
        }).then(function () {
            this.partial('./views/movie/editMoviePage.hbs');
        })
    };

    const postEditMovie = function (context) {
        cinemaModel.editMovie(context.params)
            .then(helper.handler)
            .then(cinemaController.getMyMovies(context));
    };

    const postDeleteMovie = function (context) {
        cinemaModel.deleteMovie(context.params.id)
            .then(helper.handler)
            .then(cinemaController.getMyMovies(context));
    };

    const getDetailsMovie = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        let response = await cinemaModel.getMovie(context.params.id);
        let movie = await response.json();

        context.movie = movie;

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/movie/detailsMoviePage.hbs');
        });
    };

    const postBuyTicket = async function (context) {
        let response = await cinemaModel.getMovie(context.params.id);
        let movie = await response.json();

        cinemaModel.buyTicket(movie)
            .then(helper.handler)
    };

    return {
        getCinema,
        getMyMovies,
        getAddMovie,
        postAddMovie,
        getEditMovie,
        postEditMovie,
        postDeleteMovie,
        getDetailsMovie,
        postBuyTicket
    }
}();