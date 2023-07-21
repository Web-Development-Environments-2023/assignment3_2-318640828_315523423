const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const DButils = require("./DButils");
/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */
async function getRecipeInformation(recipe_id) {
    const response =  await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return response.data;
}
exports.getRecipeInformation = getRecipeInformation;

async function getRandomRecipesInformaition(number){
  //return (`${api_domain}/random?number=${number}`);
  const recipes = await axios.get(`${api_domain}/random?number=${number}`, {
    params: {
        includeNutrition: false,
        apiKey: process.env.spooncular_apiKey
    }
});

    const recipeObjects = recipes.data.recipes; // Array of recipe objects
    
    const recipeDetails = [];

    for (let i = 0; i < recipeObjects.length; i++) {
      const recipe = recipeObjects[i];
      // Access recipe details
      // const recipeId = recipe.id;
      // const recipeTitle = recipe.title;
      // const recipeIngredients = recipe.extendedIngredients;
      // const recipeInstructions = recipe.instructions;
      recipeDetails.push({
        id: recipe.id,
        title: recipe.title,
        readyInMinutes: recipe.readyInMinutes,
        image: recipe.image,
        //popularity: recipe.aggregateLikes,
        vegan: recipe.vegan,
        vegetarian: recipe.vegetarian,
        glutenFree: recipe.glutenFree,
      });

    }
    return recipeDetails;

}
exports.getRandomRecipesInformaition = getRandomRecipesInformaition;


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
    const recipes_info = await DButils.execQuery(`select title, readyInMinutes, image, popularity, vegan, vegetarian, glutenFree, IngredientsAndAmount,instructions,servings from recipes where recipe_id='${recipe_id_to_check}'`);
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


  async function getFullDetails(recipe_id) {
    try {
      const recipeDetails = [];
      // for (const oneId of recipe_id) {
        const recipeInfo = await getRecipeInformation(recipe_id);
        const { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients,instructions,analyzedInstructions } = recipeInfo.data;
  
        recipeDetails.push({
          id,
          title,
          readyInMinutes,
          image,
          popularity: aggregateLikes,
          vegan,
          vegetarian,
          glutenFree,
          extendedIngredients,
          instructions,
          analyzedInstructions
        });
      //}
  
      return recipeDetails;
    } catch (error) {
      throw error;
    }
  }
exports.getFullDetails = getFullDetails;



// -------- need to change a little bit --------


async function getRecipePreviewDetails(recipeId) {
  const recipeInfo = await getRecipeInformation(recipeId);
  const { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, isSeen, isFavorite, summary } = recipeInfo;

  return {
      recipe_id: id,
      title: title,
      ready_in_minutes: readyInMinutes,
      image: image,
      aggregate_likes: aggregateLikes,
      vegan: vegan,
      vegetarian: vegetarian,
      gluten_free: glutenFree,
      is_seen: isSeen,
      is_favorite: isFavorite,
      summary: summary ? summary : "No summary available"}
}

async function getRecipesPreview(recipesIdArray) {
  let previewsArray = [];
  for(let recipeId of recipesIdArray){
      previewsArray.push(await getRecipePreviewDetails(recipeId));
  }

  return previewsArray;
}


async function searchRecipes(que) {
  const param = {
    query: que,
    // cuisine: query.cuisine,
    // diet: query.diet,
    // intolerances: query.intolerance,
    number: 10,
    apiKey: process.env.spooncular_apiKey
  }
  const response = await axios.get(`${api_domain}/complexSearch?query=${param.query}&number=${param.number}&apiKey=${param.apiKey}`);
  console.log(response.data.results);
return getRecipesPreview(response.data.results.map((element) => element.id));

  // const param = {
  //   query: query,
  //   number: 10,
  //   apiKey: process.env.spooncular_apiKey }
  const recipes_info = await axios.get(`${api_domain}/complexSearch?query=${param.query}&number=${param.number}&apiKey=${param.apiKey}`);
  // const recipes_info = await axios.get(`${api_domain}/complexSearch`, {
  //     params: {
  //         query: query,
  //         number: 10,
  //         apiKey: process.env.spooncular_apiKey
  //     }
  // });
  const recipes = recipes_info.data.results;
  const recipes_preview = [];
  recipes.forEach((recipe_info) => {
      recipes_preview.push({
          id: recipe_info.id,
          title: recipe_info.title,
          readyInMinutes: recipe_info.readyInMinutes,
          image: recipe_info.image,
          popularity: recipe_info.aggregateLikes,
          vegan: recipe_info.vegan,
          vegetarian: recipe_info.vegetarian,
          glutenFree: recipe_info.glutenFree,
      });
  });
  return recipes_preview;
}
exports.searchRecipes = searchRecipes;

// async function searchRecipes(query) {
//   console.log(query);
//   const recipes_info = await axios.get(`${api_domain}/complexSearch`, {
//       params: {
//           query: query,
//           number: 10,
//           // instructionsRequired: true,
//           // apiKey: process.env.spooncular_apiKey
//           includeNutrition: false,
//           apiKey: process.env.spooncular_apiKey
//       }
//   });
//   const recipes_preview = recipes_info.data.results;
//   // const recipes_preview = [];
//   // const { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipes;

//   // recipes_preview.push({
//   //   id,
//   //   title,
//   //   readyInMinutes,
//   //   image,
//   //   popularity: aggregateLikes,
//   //   vegan,
//   //   vegetarian,
//   //   glutenFree
//   // });
  
//   // recipes.forEach((recipe_info) => {
//   //     recipes_preview.push({
//   //         id: recipe_info.id,
//   //         title: recipe_info.title,
//   //         readyInMinutes: recipe_info.readyInMinutes,
//   //         image: recipe_info.image,
//   //         popularity: recipe_info.aggregateLikes,
//   //         vegan: recipe_info.vegan,
//   //         vegetarian: recipe_info.vegetarian,
//   //         glutenFree: recipe_info.glutenFree,
//   //     });
//   // });
//   return recipes_preview;
// }
exports.searchRecipes = searchRecipes;