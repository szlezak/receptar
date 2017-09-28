import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonTextStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

class Button extends Component {
  render() {
    const { backgroundColor, borderColor, color, onPress, text } = this.props;

    return (
      <TouchableOpacity
        style={[styles.buttonStyle, { backgroundColor, borderColor }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonTextStyle, { color }]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
