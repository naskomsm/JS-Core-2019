const homeController = function () {
    const getHome = async function (context) {
        helper.addHeaderInfo(context);

        try {
            let response = await recipeModel.getAllRecipes();
            let recipes = await response.json();

            recipes.forEach(recipe => {
                recipe.ingredients = recipe.ingredients.split(', ');
            });

            context.recipes = recipes;
        } catch (e) {
            console.log(e);
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            meal: "../views/recipe/meal.hbs"
        }).then(function () {
            this.partial('../views/home/homePage.hbs');
        })
    };

    return {
        getHome
    };
}();