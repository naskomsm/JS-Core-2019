const storage = function () {
    const appKey = 'kid_SJgbUsSfB';
    const appSecret = 'a35fd3edcdbe47c093d0da5cb90b27f5';

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
    }
}();