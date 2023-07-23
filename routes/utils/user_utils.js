
const DButils = require("./DButils");
async function markAsFavorite(user_id, recipe_id){

        // const recipe_in_database = await DButils.execQuery(`select recipe_id from recipes where recipe_id='${recipe_id}'`);
        // if (recipe_in_database.length == 0){
        //     throw { status: 409, message: "recipe not in database" };
        // }
     // check if the recipe is already in the favorite list
        const recipe = await DButils.execQuery(`select recipe_id from favoriterecipes where user_id='${user_id}' AND  recipe_id='${recipe_id}' `); // and recipe_id in (SELECT recipe_id FROM recipes)
        console.log(recipe);
        if (recipe.length != 0){
            throw { status: 409, message: "recipe allready in favorite list" };
        }
    // add the new recipe
    await DButils.execQuery(`insert into favoriterecipes values ('${user_id}',${recipe_id})`);
}
exports.markAsFavorite = markAsFavorite;

async function ismarkAsFavorite(user_id, recipe_id){

    const recipe = await DButils.execQuery(`select recipe_id from favoriterecipes where user_id='${user_id}' AND recipe_id='${recipe_id}' `); // and recipe_id in (SELECT recipe_id FROM recipes)
    console.log(recipe.length);
    if (recipe.length == 0){
        return false;
    }
    return true
}
exports.ismarkAsFavorite = ismarkAsFavorite;

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from favoriterecipes where user_id='${user_id}'`);
    return recipes_id;
}


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
async function getLast3Watch(user_id){
    console.log("this is userID in get",user_id);
    return recipes = await DButils.execQuery(`SELECT R1, R2, R3 FROM watched WHERE user_id='${user_id}'`);
}
exports.getLast3Watch = getLast3Watch;

//TODO: need to change names of variables and create a table named watched
async function UpdateLast3Watched(user_id, recipe_id) {
    const last_3_ans = await DButils.execQuery(`select * from watched where user_id='${user_id}'`);
    if (last_3_ans.length === 0) {
        let R1 = recipe_id;
        let  flag = 2;
        await DButils.execQuery(`insert into watched (user_id,R1,flag) VALUES ('${user_id}', '${R1}', '${flag}')`);
    }
    else{
        if (last_3_ans[0].flag === 1) {
            const R1 = recipe_id;
            const flag = 2;
            await DButils.execQuery(`UPDATE watched SET R1='${R1}', flag='${flag}'`);
        }
        else if (last_3_ans[0].flag === 2) {
            const R2 = recipe_id;
            const flag = 3;
            await DButils.execQuery(`UPDATE watched SET R2='${R2}', flag='${flag}'`);
        }
        else if (last_3_ans[0].flag === 3) {
            const R3 = recipe_id;
            const flag = 1;
            await DButils.execQuery(`UPDATE watched SET R3='${R3}', flag='${flag}'`);
        }
    } 
    // if (last_3_ans.length === 1)
    // {
    //     const History_Watch_R1 = last_3_ans[0].History_Watch_R1;
    //     const History_Watch_R2 = recipe_id;
    //     const History_Watch_R3 = 0;
    //     await DButils.execQuery(`insert into user_last_3_watch (user_id,History_Watch_R1,History_Watch_R2,History_Watch_R3) VALUES ('${user_id}', '${History_Watch_R1}', '${History_Watch_R2}','${History_Watch_R3}')`);
    // }
    // else if(last_3_ans.length === 2)
    // {
    //     const History_Watch_R1 = last_3_ans[0].History_Watch_R1;
    //     const History_Watch_R2 = last_3_ans[0].History_Watch_R2;
    //     const History_Watch_R3 = recipe_id;
    //     await DButils.execQuery(`insert into user_last_3_watch (user_id,History_Watch_R1,History_Watch_R2,History_Watch_R3) VALUES ('${user_id}', '${History_Watch_R1}', '${History_Watch_R2}','${History_Watch_R3}')`);
    // }
    // else {
    //     //let results=Object.values(JSON.parse(JSON.stringify(DB_ans)));
    //     let History_Watch_R1 = last_3_ans[0].History_Watch_R1;
    //     let History_Watch_R2 = last_3_ans[0].History_Watch_R2;
    //     let History_Watch_R3
    //     History_Watch_R3 = History_Watch_R2;
    //     History_Watch_R2 = History_Watch_R1;
    //     History_Watch_R1 = recipe_id;
    //     console.log(History_Watch_R1);
    //     console.log(History_Watch_R2);
    //     console.log(History_Watch_R3);
    //     await DButils.execQuery(`update user_last_3_watch set History_Watch_R1='${History_Watch_R1}',History_Watch_R2='${History_Watch_R2}',History_Watch_R3='${History_Watch_R3}' where user_id='${user_id}'`);
    // }
}
exports.UpdateLast3Watched = UpdateLast3Watched;
