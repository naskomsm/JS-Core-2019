const eventModel = function () {
    const createEvent = function (params) {
        let data = {
            ...params,
            peopleInterestedIn: 0,
            organizer: JSON.parse(storage.getData('userInfo')).username
        };

        let url = `/appdata/${storage.appKey}/events`;

        let headers = {
            body: JSON.stringify(data),
            headers: {} // look at makeRequest in helper
        };

        return requester.post(url,headers);
    };

    const getAllEvents = function(){

        let url = `/appdata/${storage.appKey}/events`;
        let headers = {
            headers: {}
        };

        return requester.get(url,headers);
    };

    const getEvent = function (id){
        let url = `/appdata/${storage.appKey}/events/${id}`;
        let headers = {
            headers: {}
        };

        return requester.get(url,headers);
    };

    const editEvent = function (params){
        let url = `/appdata/${storage.appKey}/events/${params.id}`; 
        // let data = {

        // }; // obekta bez Id
        delete params.id; // ili nov object bez id property ili go triem

        let headers = {
            headers: {},
            body: JSON.stringify({...params})
        };

        return requester.put(url,headers);
    };

    const deleteEvent = function (id){
        let url = `/appdata/${storage.appKey}/events/${id}`;
        let headers = {
            headers: {}
        };

        return requester.del(url,headers);
    };

    return {
        createEvent,
        getAllEvents,
        getEvent,
        editEvent,
        deleteEvent
    };
}();