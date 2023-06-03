var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");
const { route } = require("./auth");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT username FROM users").then((users) => {
      if (users.find((x) => x.username === req.session.user_id)) {
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


<<<<<<< HEAD
/**
 * This path returns the recipes that were upload by the logged-in user
 */
router.get('/MyRecipes', async (req,res,next) => {
=======


router.get('/last-viewed', async (req,res,next) => {
>>>>>>> 107e30bf8870f38cfa64d8dab314116540d3cf45
  try{
    const user_id = req.session.user_id;
    const recipes = await user_utils.getUserLastWatched(user_id);
    let recipes_id_array = [];
<<<<<<< HEAD
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
=======
    recipes.map((element) => recipes_id_array.push(element));
    res.status(200).send(recipes_id_array.splice(0, 3));
  }
  catch(error){
    next(error);
  }
});

router.post('/last-viewed', async (req,res,next) => {
>>>>>>> 107e30bf8870f38cfa64d8dab314116540d3cf45
  try{
    const user_id = req.session.user_id;
    const recipes = req.body.recipeId;
    let recipes_id_array = [];
<<<<<<< HEAD
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getFamilyRecipeDetails(recipes_id_array);
    res.status(200).send(results);
=======
    recipes.map((element) => recipes_id_array.push(element.title.toLowerCase()));
    if(!recipes_id_array.includes(recipes)) {
      await user_utils.markAsLastWatched(user_id, recipes);
      res.status(200).send("The Recipe successfully saved as last watched");
    }
    else {
      res.status(400).send("The Recipe had been saved already as last watched");
    }
>>>>>>> 107e30bf8870f38cfa64d8dab314116540d3cf45
  }
  catch(error){
    next(error);
  }
});

<<<<<<< HEAD

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


=======
router.get('family-recipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes = await user_utils.getUserRecipes(user_id);
    let recipes_id_array = [];
    recipes.map((element) => recipes_id_array.push(element));
    res.status(200).send(recipes_id_array);
  }
  catch(error){
    next(error);
  }
});
>>>>>>> 107e30bf8870f38cfa64d8dab314116540d3cf45

module.exports = router;
