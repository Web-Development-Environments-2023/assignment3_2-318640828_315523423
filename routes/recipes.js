var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const DButils = require("../routes/utils/DButils");
router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists
    let user_details = {
      id: req.body.id,
      title: req.body.title,
      image: req.body.image,
      readyInMinutes: req.body.readyInMinutes,
      popularity: req.body.popularity,
      vegetarian: req.body.vegetarian,
      vegan: req.body.vegan,
      glutenFree: req.body.glutenFree
    }
    let users = [];
    users = await DButils.execQuery("SELECT title from recipes");

    if (users.find((x) => x.username === user_details.username))
      throw { status: 409, message: "recipe allready written before" };

    // add the new username
    // let hash_password = bcrypt.hashSync(
    //   user_details.password,
    //   parseInt(process.env.bcrypt_saltRounds)
    // );
    await DButils.execQuery(
      `INSERT INTO recipes (title, image, readyInMinutes, popularity, vegetarian, vegan, glutenFree) 
      VALUES ('${user_details.title}', '${user_details.image}', ${user_details.readyInMinutes}, 
      ${user_details.popularity}, ${user_details.vegetarian}, ${user_details.vegan}, ${user_details.glutenFree})`
    );
    res.status(201).send({ message: "recipe created", success: true });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
