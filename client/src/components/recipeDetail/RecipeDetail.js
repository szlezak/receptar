import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import Directions from './Directions';
import InfoTeaser from './InfoTeaser';
import Ingredients from './Ingredients';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

class RecipeDetail extends Component {
  render() {
    const {
      title,
      ingredients,
      preparationTime,
      directions,
      servingCount,
    } = this.props.recipeData;

    return (
      <ScrollView style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <InfoTeaser
          preparationTime={preparationTime}
          servingCount={servingCount}
        />
        <Ingredients ingredients={ingredients} />
        <Directions directions={directions} />
      </ScrollView>
    );
  }
}

export default RecipeDetail;
