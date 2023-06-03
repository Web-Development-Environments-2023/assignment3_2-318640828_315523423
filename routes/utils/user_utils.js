const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into favoriterecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from favoriterecipes where user_id='${user_id}'`);
    return recipes_id;
}


exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;



//  ADDING A NEW MY RECIPE

async function addNewRecipe(user_id, recipeDetails){ // recipeDetails is an object
    await DButils.execQuery(`insert into recipes (user_id, recipe_id, title, image, readyInMinutes, popularity,
        vegetarian, vegan, glutenFree, IngredientsAndAmount, instructions, servings)
     values ('${user_id}', '${recipeDetails.recipe_id}', '${recipeDetails.title}',
     '${recipeDetails.image}', '${recipeDetails.readyInMinutes}', '${recipeDetails.popularity}', '${recipeDetails.vegetarian}',
     '${recipeDetails.vegan}', '${recipeDetails.glutenFree}', '${recipeDetails.IngredientsAndAmount}',
     '${recipeDetails.instructions}', '${recipeDetails.servings}'
     )`);
}

exports.addNewRecipe = addNewRecipe;

// GETTING MY RECIPES

async function getMyRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from recipes where user_id='${user_id}'`);
    return recipes_id;
}
exports.getMyRecipes = getMyRecipes;

// GETTING MY FAMILY RECIPES

async function getMyFamilyRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FamilyRecipes where user_id='${user_id}'`);
    return recipes_id;
}
exports.getMyFamilyRecipes = getMyFamilyRecipes;

// ADDING A NEW FAMILY RECIPE

async function addNewFamilyRecipe(user_id, recipe_name, recipe_category, recipe_ingredients, recipe_instructions, recipe_image){
    await DButils.execQuery(`insert into FamilyRecipes values ('${user_id}', '${recipe_name}', '${recipe_category}', '${recipe_ingredients}', '${recipe_instructions}', '${recipe_image}')`);
}
exports.addNewFamilyRecipe = addNewFamilyRecipe;

