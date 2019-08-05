const userController = function () {
    const getLogin = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/loginPage.hbs');
        })
    };

    const postLogin = function (context) {
        userModel.login(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveUser(data);
                context.redirect('#/home');
            })
    };

    const getRegister = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/registerPage.hbs');
        })
    };

    const postRegister = function (context) {
        userModel.register(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveUser(data);
                context.redirect('#/home');
            })
    };

    const logout = function (context) {
        userModel.logout()
            .then(helper.handler)
            .then(() => {
                storage.deleteUser();
                context.redirect('#/home');
            });
    };

    const getUserInfo = async function (context) {
        helper.addHeaderInfo(context);

        const url = `/user/${storage.appKey}/${JSON.parse(storage.getData('userInfo'))._id}`;

        let headers = {
            headers: {}
        };

        let response = await requester.get(url,headers);
        let user = await response.json();

        context.user = user;

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/profilePage.hbs');
        }).then(context.redirect('#/home'))
    };

    const buyOffer = function () {
        userModel.updateUser();
    };

    return {
        getLogin,
        postLogin,
        getRegister,
        postRegister,
        logout,
        getUserInfo,
        buyOffer
    };
}();