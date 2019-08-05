const storage = function () {
    const appKey = 'kid_S1qP_VVmB';
    const appSecret = '5ed1697c1d0646ef83dc8e5e238132a9';

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