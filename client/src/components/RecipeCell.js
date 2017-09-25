import React, { Component  } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  cellWrapper: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
  },
});

class RecipeCell extends Component {
  _onCellPress = () => {
    const { onPress, recipeData } = this.props;

    onPress({ recipeData });
  }

  _getImageSource = () => {
    // TODO: recipe image from props
  }

  render() {
    const { onPress, recipeData } = this.props;
    const { title } = recipeData || {};

    return (
      <TouchableHighlight onPress={this._onCellPress}>
        <View style={styles.cellWrapper}>
          <Image
            style={styles.image}
            source={require('../assets/icon-image.png')}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default RecipeCell;
