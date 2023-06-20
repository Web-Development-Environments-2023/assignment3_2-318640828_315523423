const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const DButils = require("./DButils");
/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */
async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}
exports.getRecipeInformation = getRecipeInformation;



async function getRecipeDetails(recipe_id) {
    try {
      const recipeDetails = [];
  
      for (const oneId of recipe_id) {
        const recipeInfo = await getRecipeInformation(oneId);
        const { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipeInfo.data;
  
        recipeDetails.push({
          id,
          title,
          readyInMinutes,
          image,
          popularity: aggregateLikes,
          vegan,
          vegetarian,
          glutenFree
        });
      }
  
      return recipeDetails;
    } catch (error) {
      throw error;
    }
  }
exports.getRecipeDetails = getRecipeDetails;

async function getMyRecipeInformation(recipe_id_to_check) {
    const recipes_info = await DButils.execQuery(`select title, readyInMinutes, image, popularity, vegan, vegetarian, glutenFree from recipes where recipe_id='${recipe_id_to_check}'`);
    return recipes_info;
}
exports.getMyRecipeInformation = getMyRecipeInformation;



async function getMyRecipeDetails(recipe_id) {
    try {
      const recipeDetails = [];
  
      for (const oneID of recipe_id) {
        const recipeInfo = await getMyRecipeInformation(oneID);
        recipeDetails.push(recipeInfo);
      }
  
      return recipeDetails;
    } catch (error) {
      throw error;
    }
  }
exports.getMyRecipeDetails = getMyRecipeDetails;




async function getFamilyInformation(recipe_id_to_check) {
    const recipes_info = await DButils.execQuery(`select recipe_id, owner, cookingTime, ingridients, instructions from myfamilyrecipes where recipe_id='${recipe_id_to_check}'`);
    return recipes_info;
}
exports.getFamilyInformation = getFamilyInformation;


async function getFamilyRecipeDetails(recipe_id) {
    try {
      const recipeDetails = [];

      for (const oneID of recipe_id) {
        const recipeInfo = await getFamilyInformation(oneID);
        recipeDetails.push(recipeInfo);
      }

      return recipeDetails;
    } catch (error) {
      throw error;
    }
  }
  exports.getFamilyRecipeDetails = getFamilyRecipeDetails;