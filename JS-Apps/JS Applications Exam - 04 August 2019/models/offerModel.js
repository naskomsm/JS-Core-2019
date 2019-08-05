const offerModel = function () {
    const create = function (params) {
        let data = {
            product: params.product,
            description: params.description,
            price: params.price,
            pictureUrl: params.pictureUrl,
        };

        let url = `/appdata/${storage.appKey}/offers`;

        let headers = {
            body: JSON.stringify(data),
            headers: {}
        };

        return requester.post(url, headers);
    };

    const getOffers = function () {
        let url = `/appdata/${storage.appKey}/offers`;
        let headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const getOffer = function (id) {
        let url = `/appdata/${storage.appKey}/offers/${id}`;
        let headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const editOffer = function (params){
        let url = `/appdata/${storage.appKey}/offers/${params.id}`;

        delete params.id;

        let headers = {
            headers: {},
            body: JSON.stringify({ ...params })
        };

        return requester.put(url, headers);
    };

    const deleteOffer = function (id){
        let url = `/appdata/${storage.appKey}/offers/${id}`;
        let headers = {
            headers: {}
        };

        return requester.del(url,headers);
    };

    return {
        create,
        getOffers,
        getOffer,
        editOffer,
        deleteOffer,
    };
}();