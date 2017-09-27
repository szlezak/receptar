import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EmptyLabel from '../common/EmptyLabel';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ededed',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#bdbdbd',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '700',
  },
  ingredientWrapper: {
    flexDirection: 'row',
  },
  ingredientLabel: {
    marginLeft: 5,
  },
});

class Ingredients extends Component {
  renderIngredients = () => {
    const { ingredients } = this.props;

    if (!ingredients.length) {
      return <EmptyLabel label="Recipe does not have any ingredients" />;
    }

    return ingredients.map(ingredient => (
      <View style={styles.ingredientWrapper} key={ingredient._id}>
        <Text>
          {`\u2022 ${ingredient.amount}` || null}
        </Text>
        <Text>
          {ingredient.amountUnit.toLowerCase() || null}
        </Text>
        <Text style={styles.ingredientLabel}>
          {ingredient.name || null}
        </Text>
      </View>
    ),
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>Ingredients</Text>
        {this.renderIngredients()}
      </View>
    );
  }
}

export default Ingredients;
