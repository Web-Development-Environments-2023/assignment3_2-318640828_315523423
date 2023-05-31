const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}


exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;



//  ADDING A NEW RECIPE

async function addNewRecipe(user_id, recipe_name, recipe_category, recipe_ingredients, recipe_instructions, recipe_image){
    await DButils.execQuery(`insert into Recipes values ('${user_id}', '${recipe_name}', '${recipe_category}', '${recipe_ingredients}', '${recipe_instructions}', '${recipe_image}')`);
}
exports.addNewRecipe = addNewRecipe;

// GETTING MY RECIPES

async function getMyRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from Recipes where user_id='${user_id}'`);
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

