const e = require("express");
const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
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
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
