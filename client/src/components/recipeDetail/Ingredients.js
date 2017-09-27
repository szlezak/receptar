import React, { Component  } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';

class Ingredients extends Component {
  render() {
    const { ingredients } = this.props;
    const {
      name,
      amountUnit,
      amount,
    } = ingredients || {};

    if (!ingredients) {
      return (
        <View>
          <Text>
            Recipe does not have any ingredients
          </Text>
        </View>
      );
    }

    return (
      <View>
        {ingredients.map(ingredient =>
          <View key={ingredient.id}>
            <Text>{ingredient.name}</Text>
            <Text>{ingredient.amount}</Text>
            <Text>{ingredient.amountUnit}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Ingredients;
