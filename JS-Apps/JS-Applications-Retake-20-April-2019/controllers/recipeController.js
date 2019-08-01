const recipeController = function () {
    const getCreate = function (context) {
        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        }).then(function () {
            this.partial('../views/recipe/createRecipe.hbs');
        })
    };

    const postCreate = function (context) {
        recipeModel.create(context.params)
            .then(helper.handler)
            .then(context.redirect('#/home'));
    };

    const getRecipe = async function (context) {
        helper.addHeaderInfo(context);

        let response = await recipeModel.getRecipe(context.params.id);
        let recipe = await response.json();

        recipe.ingredients = recipe.ingredients.split(', ');

        const isCreator = JSON.parse(storage.getData('userInfo'))._id === recipe._acl.creator;
        context.recipe = recipe;
        context.isCreator = isCreator;

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        }).then(function () {
            this.partial('../views/recipe/details.hbs');
        })
    };

    const getEdit = async function (context) {
        helper.addHeaderInfo(context);

        let response = await recipeModel.getRecipe(context.params.id);
        let recipe = await response.json();

        recipe.ingredients = recipe.ingredients.split(', ');
        context.recipe = recipe;

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        }).then(function () {
            this.partial('../views/recipe/editRecipe.hbs');
        })
    };

    const postEdit = function (context) {
        recipeModel.editRecipe(context.params)
            .then(helper.handler)
            .then(homeController.getHome(context));
    };

    return {
        getCreate,
        postCreate,
        getRecipe,
        getEdit,
        postEdit
    }
}();