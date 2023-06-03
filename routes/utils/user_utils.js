const e = require("express");
const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
<<<<<<< HEAD
    await DButils.execQuery(`insert into favoriterecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from favoriterecipes where user_id='${user_id}'`);
    return recipes_id;
}

=======
    await DButils.execQuery(`insert into ufavorites values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from ufavorites where user_id='${user_id}'`);
    return recipes_id;
}

async function markAsUserRecipe(user_id, recipe_id){
    await DButils.execQuery(`insert into urecipes values ('${user_id}',${recipe_id})`);
}

async function getUserRecipes(user_id){
    const recipes = await DButils.execQuery(`select * from urecipes where user_id='${user_id}'`);
    return recipes;
}

async function markAsLastWatched(user_id, recipe_id){
    await DButils.execQuery(`insert into uwatchedrecipes values ('${user_id}',${recipe_id})`);
}

async function getUserLastWatched(user_id){
    const recipes = await DButils.execQuery(`select * from uwatchedrecipes where user_id='${user_id}'`);
    return recipes;
}

async function addRecipes(user_id, recipe_details){
    await DButils.execQuery(`insert into urecipes values ('${user_id}',${recipe_details.id})`);
    await DButils.execQuery(`insert into recipes values (${recipe_details.id}, '${recipe_details.title}', '${recipe_details.image}', ${recipe_details.readyInMinutes}, ${recipe_details.popularity}, ${recipe_details.vegetarian}, ${recipe_details.vegan}, ${recipe_details.glutenFree}), ${recipe_details.ingredients}, ${recipe_details.instructions}, ${recipe_details.servings}')`);
}

exports.addRecipes = addRecipes;
exports.getUserLastWatched = getUserLastWatched;
exports.getUserLastWatched = getUserLastWatched;
exports.markAsUserRecipe = markAsUserRecipe;
exports.markAsLastWatched = markAsLastWatched;
exports.getUserRecipes = getUserRecipes;
>>>>>>> 107e30bf8870f38cfa64d8dab314116540d3cf45
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
    const recipes_id = await DButils.execQuery(`select recipe_id from myfamilyrecipes where user_id='${user_id}'`);
    return recipes_id;
}
exports.getMyFamilyRecipes = getMyFamilyRecipes;

// ADDING A NEW FAMILY RECIPE

// async function addNewFamilyRecipe(user_id, recipe_name, recipe_category, recipe_ingredients, recipe_instructions, recipe_image){
//     await DButils.execQuery(`insert into FamilyRecipes values ('${user_id}', '${recipe_name}', '${recipe_category}', '${recipe_ingredients}', '${recipe_instructions}', '${recipe_image}')`);
// }
// exports.addNewFamilyRecipe = addNewFamilyRecipe;

