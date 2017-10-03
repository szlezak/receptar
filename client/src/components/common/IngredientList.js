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

  hash(input) {
    let hash = 0;
    const length = input.length;

    for (i = 0; i < length; i++) {
      charC = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + charC;
      hash = hash & hash;
    }

    return hash;
  }

  render() {
    const { ingredients } = this.props;

    if (!ingredients) {
      return null;
    }

    return (
      <View>
        {ingredients.map((ingredient) => {
          const { _id, amount, amountUnit, name } = ingredient || {};
          const customizedunit = amountUnit && amountUnit.toLowerCase();

          return (
            <View style={styles.ingredientWrapper} key={this.hash(name+amount+amountUnit)}>
              <Text>{`\u2022 ${amount}`}</Text>
              <Text>{customizedunit}</Text>
              <Text style={styles.ingredientLabel}>{name}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

export default IngredientList;
