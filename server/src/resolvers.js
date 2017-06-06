import { recipeModel } from './model';
import { mongo } from './conectors';

let nextId = 3;

export const resolvers = {
  Query: {
    recipes: () => {
      return mongo.model('recipe').find().then(a =>
        a.map(recipe => recipe)
      );
    },
  },

  Mutation: {
    addRecipe: (root, args) => {
      const recipe = new recipeModel({
        id: nextId++,
        title: args.title,
        preparationTime: args.preparationTime,
        servingCount: args.servingCount,
        sideDish: args.sideDish,
        directions: args.directions,
      });

      recipe.save().then((newRecipe) => {
        console.log('saved', newRecipe)
      }).catch((err) => {
        console.log('err', err)
      })

      return recipe;
    },
  },
};
