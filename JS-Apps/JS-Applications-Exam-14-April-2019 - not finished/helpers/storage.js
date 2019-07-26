const storage = function () {
    const appKey = 'kid_Byo6HGQfS';
    const appSecret = '8eeb43af57584c13b66a40629d138c6d';

    const getData = function (key) {
        return localStorage.getItem(key + appKey);
    };

    const saveData = function (key, value) {
        localStorage.setItem(key + appKey, JSON.stringify(value));
    };

    const saveUser = function (data) {
        saveData('userInfo', data);
        saveData('authToken', data._kmd.authtoken);
    };

    const saveEvent = function(data){
        saveData('eventInfo',data);
    };

    const deleteUser = function () {
        localStorage.removeItem('userInfo' + appKey);
        localStorage.removeItem('authToken' + appKey);
    };
    
    return {
        getData,
        saveUser,
        deleteUser,
        appKey,
        appSecret,
        saveEvent
    }
}();