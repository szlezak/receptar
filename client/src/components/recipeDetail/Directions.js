import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

class Directions extends Component {
  render() {
    const { directions } = this.props;

    if (!directions) {
      return (
        <View>
          <Text>
            Recipe does not have any directions
          </Text>
        </View>
      );
    }

    return (
      <View>
        {directions.split('*)').map((direction, index) => {
          return (!index)
            ? null
            : <Text key={index}>{index} {direction}</Text>;
        })}
      </View>
    );
  }
}

export default Directions;

