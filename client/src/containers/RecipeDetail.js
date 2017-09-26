import React, { Component  } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import BasicText from '../components/common/BasicText';
import LoadingIndicator from '../components/common/LoadingIndicator';

class RecipeDetail extends Component {
  render() {
    const { data } = this.props || {};
    const { error, loading, recipe } = data || {};

    if (error) {
      return <BasicText text="An unexpected error occurred" />;
    }

    if (loading) {
      return <LoadingIndicator />;
    }

    const {
      title,
      image,
      ingredients,
      preparationTime,
      directions,
      servingCount,
    } = recipe || {};

    const {
      name,
      amountUnit,
      amount,
    } = ingredients || {};

    return (
      <View>
        <Text>{title}</Text>
        <Text>Preparation time: {preparationTime}</Text>
        <Text>Servings: {servingCount}</Text>
      </View>
    );
  }
}


        // <View>
        //   {directions.split('*)').map((direction, index) => {
        //     if (!index) {
        //       return null;
        //     }

        //     return <Text key={index}>{index} {direction}</Text>;
        //   })}
        // </View>

        // {ingredients.map(ingredient =>
        //   <View key={ingredient.id}>
        //     <Text>{ingredient.name}</Text>
        //     <Text>{ingredient.amount}</Text>
        //     <Text>{ingredient.amountUnit}</Text>
        //   </View>
        // )}
const RecipeDetailQuery = gql`
  query RecipeDetailQuery($recipeID: String!) {
    recipe(id: $recipeID) {
      title
      image
      preparationTime
      directions
      servingCount
      ingredients {
        name
        amountUnit
        amount
      }
    }
  }
`;

const RecipeDetailWithData = graphql(RecipeDetailQuery, {
  options: (props) => ({
    variables: { recipeID: props.navigation.state.params._id }
  }),
})(RecipeDetail)

export default RecipeDetailWithData;
