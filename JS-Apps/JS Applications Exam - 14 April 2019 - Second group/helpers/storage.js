const storage = function () {
    const appKey = 'kid_BkPoQF6Gr';
    const appSecret = 'aef3bb04c6494b42b43d6845b50bd7a2';

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