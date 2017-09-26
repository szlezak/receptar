import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
  },
});

function LoadingIndicator() {
  return (
    <ActivityIndicator
      animating={true}
      style={styles.indicator}
      size="small"
    />
  );
}

export default LoadingIndicator;
