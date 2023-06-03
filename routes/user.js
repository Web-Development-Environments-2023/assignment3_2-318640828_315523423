var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipeDetails(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});


/**
 * This path returns the recipes that were upload by the logged-in user
 */
router.get('/MyRecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getMyRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getMyRecipeDetails(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/**
 * This path gets body with recipeId and save this recipe in the list with logged-in userID
 */
router.post('/MyRecipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const { recipe_id, title, image, readyInMinutes, popularity, vegetarian, vegan, glutenFree, IngredientsAndAmount, instructions, servings } = req.body;
    
    // Create an object to hold all the recipe details
    const recipeDetails = {
      recipe_id,
      title,
      image,
      readyInMinutes,
      popularity,
      vegetarian,
      vegan,
      glutenFree,
      IngredientsAndAmount,
      instructions,
      servings
    };
    
    await user_utils.addNewRecipe(user_id, recipeDetails);
    res.status(200).send("The Recipe successfully saved in My Recipes");
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns the family recipes that were of the logged-in user
 */
router.get('/MyFamilyRecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getMyFamilyRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getFamilyRecipeDetails(recipes_id_array);
    res.status(200).send(results);
  }
  catch(error){
    next(error);
  }
});


// router.post('/MyFamilyRecipes', async (req,res,next) => {
//   try{
//     const user_id = req.session.user_id;
//     const recipe_name = req.body.recipeName;
//     const recipe_category = req.body.recipeCategory;
//     const recipe_ingredients = req.body.recipeIngredients;
//     const recipe_instructions = req.body.recipeInstructions;
//     const recipe_image = req.body.recipeImage;
//     await user_utils.addNewFamilyRecipe(user_id, recipe_name, recipe_category, recipe_ingredients, recipe_instructions, recipe_image);
//     res.status(200).send("The Recipe successfully saved as favorite");
//   }
//   catch(error){
//     next(error);
//   }
// });



module.exports = router;
