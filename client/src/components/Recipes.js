import React from 'react';
import { FlatList } from 'react-native';

import RecipeItem from './RecipeItem';

function Recipes({ recipesData }) {
  return (
    <FlatList
      data={recipesData}
      renderItem={({item}) => <RecipeItem recipeData={item} />}
    />
  );
}

export default Recipes;
