import React, { Component  } from 'react';
import { ScrollView  } from 'react-native';
import { View, Text, Image, TouchableHighlight } from 'react-native';

class RecipeCell extends Component {
  _onCellPress = () => {
    const { onPress, recipeData } = this.props;

    onPress({ recipeData });
  }

  render() {
    const { onPress, recipeData } = this.props;
    const { title, image } = recipeData || {};

    return (
      <TouchableHighlight onPress={this._onCellPress}>
        <View>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: image}}
          />
          <Text>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default RecipeCell;
