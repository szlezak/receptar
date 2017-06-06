import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

function RecipeItem({ recipeData }) {
  return (
    <View>
      <Text>{recipeData.title}</Text>
    </View>
  );
}

export default RecipeItem;
