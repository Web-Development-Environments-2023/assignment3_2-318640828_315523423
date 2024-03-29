var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const DButils = require("../routes/utils/DButils");
router.get("/", (req, res) => res.send("im here"));




// router.post("/", async (req, res, next) => {
//   try {
//     // parameters exists
//     // valid parameters
//     // username exists
//     let user_details = {
//       id: req.body.id,
//       title: req.body.title,
//       image: req.body.image,
//       readyInMinutes: req.body.readyInMinutes,
//       popularity: req.body.popularity,
//       vegetarian: req.body.vegetarian,
//       vegan: req.body.vegan,
//       glutenFree: req.body.glutenFree
//     }
//     let users = [];
//     users = await DButils.execQuery("SELECT title from recipes");

//     if (users.find((x) => x.username === user_details.username))
//       throw { status: 409, message: "recipe allready written before" };

//     // add the new username
//     // let hash_password = bcrypt.hashSync(
//     //   user_details.password,
//     //   parseInt(process.env.bcrypt_saltRounds)
//     // );
//     await DButils.execQuery(
//       `INSERT INTO recipes (title, image, readyInMinutes, popularity, vegetarian, vegan, glutenFree) 
//       VALUES ('${user_details.title}', '${user_details.image}', ${user_details.readyInMinutes}, 
//       ${user_details.popularity}, ${user_details.vegetarian}, ${user_details.vegan}, ${user_details.glutenFree})`
//     );
//     res.status(201).send({ message: "recipe created", success: true });
//   } catch (error) {
//     next(error);
//   }
// });
router.get("/search/:query/:number/:cuisine/:diets/:intolerances", async (req, res, next) => {
  try {
    
    if (req.params.query.length===0){
      throw { status: 401, message: "missing query" };
    }
    console.log(req.params.query)
    const query =req.params.query;
    const num = parseInt(req.params.number) || 5;
    let cuisine = req.params.cuisine;
    if (cuisine.includes("None")){cuisine = null}
    let diet = req.params.diets;
    if (diet.includes("None")){diet = null}
    let intolerances = req.params.intolerances;
    if (intolerances.includes("None")){intolerances = null}
    const recipes = await recipes_utils.searchRecipes(query, num, cuisine, diet, intolerances);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});

router.get("/fullData/:recipeId", async (req, res, next) => {
  try {
    number = req.params.recipeId;
    console.log(number);
    const recipe = await recipes_utils.getFullDetails(number);
    console.log(recipe);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/searchById/:recipeId", async (req, res, next) => {
  try {
    //console.log(req.params.recipeId);
    recipe_id_array=[req.params.recipeId]
    if (req.params.recipeId.length===0){
      throw { status: 401, message: "missing recipe_id" };
    }
    const recipe = await recipes_utils.getRecipeDetails(recipe_id_array);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.get("/random",async(req,res,next)=>{
  
  try{
    // throw { status: 401, message: "missing recipe_id"};
    const recipes = await recipes_utils.getRandomRecipesInformaition(3);
    // for (r in recipes.data){
    //   console.log(r.id);}
    //throw { status: 401, message: "missing recipe_id"};
    res.send(recipes);
  }catch (error) {
    next(error);
  }
  
} )



module.exports = router;
