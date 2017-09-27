import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import BasicText from '../components/common/BasicText';
import LoadingIndicator from '../components/common/LoadingIndicator';
import RecipeDetail from '../components/recipeDetail/RecipeDetail';

class RecipeDetailContainer extends Component {
  render() {
    const { data } = this.props || {};
    const { error, loading, recipe } = data || {};

    if (error) {
      return <BasicText text="An unexpected error occurred" />;
    }

    if (loading) {
      return <LoadingIndicator />;
    }

    if (!recipe) {
      return <BasicText text="Recipe does not have a detail" />;
    }

    return (
      <RecipeDetail recipeData={recipe} />
    );
  }
}

const RecipeDetailQuery = gql`
  query RecipeDetailQuery($recipeID: String!) {
    recipe(id: $recipeID) {
      title
      preparationTime
      directions
      servingCount
      ingredients {
        _id
        name
        amountUnit
        amount
      }
    }
  }
`;

const RecipeDetailWithData = graphql(RecipeDetailQuery, {
  options: props => ({
    variables: { recipeID: props.navigation.state.params._id },
  }),
})(RecipeDetailContainer);

export default RecipeDetailWithData;
