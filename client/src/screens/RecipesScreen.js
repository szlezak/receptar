import React, { Component } from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import BasicText from '../components/BasicText';
import Recipes from '../components/Recipes';

class RecipesScreen extends Component {
  render() {
    const { data } = this.props || {};
    const { error, loading, recipes } = data || {};

    if (error) {
      return <BasicText text="An unexpected error occurred" />;
    }

    if (loading || !recipes) {
      return <BasicText text="Loading" />;
    }

    return <Recipes recipesData={this.props.data.recipes} />;
  }
}

const RecipesQuery = gql`
  query RecipesQuery {
    recipes {
      id
      title
    }
  }
`

const RecipesScreenWithData = graphql(RecipesQuery)(RecipesScreen)

export default RecipesScreenWithData;
