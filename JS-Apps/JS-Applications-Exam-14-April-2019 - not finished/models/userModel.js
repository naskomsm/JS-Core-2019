const userModel = function () {
    const register = function (params) {
        let data = {
            username: params.username,
            password: params.password
        };

        let url = `/user/${storage.appKey}`;

        let auth = btoa(`${storage.appKey}:${storage.appSecret}`);
        let authString = `Basic ${auth}`;

        let headers = {
            body: JSON.stringify(data),
            headers: {
                Authorization: authString
            }
        };

        return requester.post(url, headers);
    };

    const login = function (params) {
        let url = `/user/${storage.appKey}/login`;

        let auth = btoa(`${params.username}:${params.password}`);
        let authString = `Basic ${auth}`;

        let headers = {
            headers: {
                Authorization: authString
            },
            body: JSON.stringify({ ...params })
        };

        return requester.post(url, headers);
    };

    const logout = function () {
        let url = `/user/${storage.appKey}/_logout`;
        let headers = {
            headers: {}
        };

        return requester.post(url, headers);
    };

    const eventPost = function (params) {
        let data = {
            name: params.name,
            dateTime: params.dateTime,
            description: params.description,
            imageURL: params.imageURL
        };

        const url = '/appdata/kid_Byo6HGQfS/events';

        let auth = btoa(`${params.username}:${params.password}`);
        let authString = `Basic ${auth}`;

        let headers = {
            headers: {
                Authorization: authString
            },
            body: JSON.stringify(data)
        };

        return requester.post(url, headers);
    };  

    const getAllEvents = function () {
        const url = 'https://baas.kinvey.com/appdata/kid_Byo6HGQfS/events';
        
        let authToken = storage.getData('authToken');
        let authString = `Kinvey ${authToken}`;

        let headers = {
            headers: {
                Authorization: authString
            }
        };

        return requester.get(url, headers);
    };  

    const getSearchedUser = function (creatorId) {
        const url = `https://baas.kinvey.com/user/kid_Byo6HGQfS/${creatorId}`;
        
        let authToken = storage.getData('authToken');

        let authString = `Kinvey ${authToken}`;

        let headers = {
            headers: {
                Authorization: authString
            }
        };

        return requester.get(url, headers);
    };

    const editEvent = function(params){
        let data = {
            name: params.name,
            dateTime: params.dateTime,
            description: params.description,
            imageURL: params.imageURL,
            peopleInterestedIn: params.peopleInterestedIn,
            organizer: params.organizer
        };

        const url = `https://baas.kinvey.com/appdata/kid_Byo6HGQfS/events/${params.id}`;

        let authToken = storage.getData('authToken');
        let authString = `Kinvey ${authToken}`;

        let headers = {
            headers: {
                Authorization: authString
            },
            body: JSON.stringify(data)
        };

        return requester.put(url, headers);
    };
    
    const deleteEvent = function (params){
        const url = `https://baas.kinvey.com/appdata/kid_Byo6HGQfS/events/${params.id}`;

        let authToken = storage.getData('authToken');
        let authString = `Kinvey ${authToken}`;

        let headers = {
            headers: {
                Authorization: authString
            }
        };

        return requester.del(url, headers);
    }

    return {
        register,
        login,
        logout,
        eventPost,
        getAllEvents,
        getSearchedUser,
        editEvent,
        deleteEvent
    }
}();