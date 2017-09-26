import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import BasicText from '../components/common/BasicText';
import LoadingIndicator from '../components/common/LoadingIndicator';
import RecipeCell from '../components/RecipeCell';

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
  },
});

class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
  }

  _onRecipePress = ({ recipeData }) => {
    this.props.navigation.navigate('RecipeDetail', { ...recipeData });
  };

  _renderRecipeCell = (rowData, sectionID, rowID) => {
    return <RecipeCell recipeData={rowData} onPress={this._onRecipePress} />;
  }

  render() {
    const { data } = this.props || {};
    const { error, loading, recipes } = data || {};

    if (error) {
      return <BasicText text="An unexpected error occurred" />;
    }

    if (loading) {
      return <LoadingIndicator />;
    }

    const dataSource = this.state.ds.cloneWithRows(recipes);

    return (
      <View style={styles.listWrapper}>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRecipeCell}
          enableEmptySections
        />
      </View>
    );
  }
}

export const RecipeListQuery = gql`
  query RecipeListQuery {
    recipes {
      _id
      title
    }
  }
`;

const RecipeListWithData = graphql(RecipeListQuery)(RecipeList)

export default RecipeListWithData;
