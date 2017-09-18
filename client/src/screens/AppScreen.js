import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import { CookbookTab } from '../navigation/router';
import apolloClient from '../helpers/connection';

class AppScreen extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <CookbookTab />
      </ApolloProvider>
    );
  }
}

export default AppScreen;
