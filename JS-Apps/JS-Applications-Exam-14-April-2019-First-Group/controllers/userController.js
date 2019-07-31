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

    const getUserInfo = async function(context){
        helper.addHeaderInfo(context);

        try {
            const request = await eventModel.getAllEvents();
            const response = await request.json();

            context.myEvents = response.filter(event => event._acl.creator === JSON.parse(storage.getData('userInfo'))._id);
        } catch (e) {
            console.log(e);
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/userPage.hbs');
        })
    };

    return {
        getLogin,
        postLogin,
        getRegister,
        postRegister,
        logout,
        getUserInfo
    };
}();