import { recipeModel } from './model';
import { mongo } from './conectors';

let nextId = 3;

export const resolvers = {
  Query: {
    recipes: () => {
      return mongo.model('recipe').find().then(recipes =>
        recipes.map(recipe => recipe)
      );
    },
  },

  Mutation: {
    addRecipe: (root, args) => {
      const { input } = args || {};

      const recipe = new recipeModel({ ...input });

      recipe.save().then((newRecipe) => {
        console.log('saved', newRecipe)
      }).catch((err) => {
        console.log('err', err)
      })

      return recipe;
    },
  },
};
