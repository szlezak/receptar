import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { StackNavigator } from 'react-navigation';

import RecipesScreenWithData from './RecipesScreen';
import apolloClient from '../helpers/connection';

const AppNavigator = StackNavigator({
  Recipe: { screen: RecipesScreenWithData },
});

class AppScreen extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <AppNavigator />
      </ApolloProvider>
    );
  }
}

export default AppScreen;
