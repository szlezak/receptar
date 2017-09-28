import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  ingredientWrapper: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  ingredientLabel: {
    marginLeft: 5,
  },
});

class IngredientList extends Component {
  render() {
    const { ingredients } = this.props;

    if (!ingredients) {
      return null;
    }

    return (
      <View>
        {ingredients.map(ingredient => (
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
        ))}
      </View>
    );
  }
}

export default IngredientList;
