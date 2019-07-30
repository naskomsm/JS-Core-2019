const cinemaModel = function () {
    const addMovie = function (params) {
        let data = {
            description: params.description,
            genres: params.genres,
            imageUrl: params.imageUrl,
            tickets: params.tickets,
            title: params.title
        };

        let url = `/appdata/${storage.appKey}/movies`;

        let headers = {
            body: JSON.stringify(data),
            headers: {}
        };

        return requester.post(url, headers);
    };

    const getMyMovies = function () {
        let url = `/appdata/${storage.appKey}/movies`;
        let headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const getMovie = function (id) {
        let url = `/appdata/${storage.appKey}/movies/${id}`;
        let headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const editMovie = function (params) {
        let url = `/appdata/${storage.appKey}/movies/${params.id}`;

        delete params.id;

        let headers = {
            headers: {},
            body: JSON.stringify({ ...params })
        };

        return requester.put(url, headers);
    };

    const deleteMovie = function (id){
        let url = `/appdata/${storage.appKey}/movies/${id}`;
        let headers = {
            headers: {}
        };

        return requester.del(url,headers);
    };

    const buyTicket = function(movie){
        let url = `/appdata/${storage.appKey}/movies/${movie._id}`;

        const data = { ...movie };
        data.tickets--;

        let headers = {
            headers: {},
            body: JSON.stringify(data)
        };

        return requester.put(url, headers);
    };

    return {
        addMovie,
        getMyMovies,
        getMovie,
        editMovie,
        deleteMovie,
        buyTicket
    };
}();