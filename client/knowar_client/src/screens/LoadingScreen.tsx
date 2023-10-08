import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export default function LoadingScreen({text}) {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Text style={styles.text}>{text}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  horizontal: {
    flexDirection: 'column',
    padding: 10,
  },
  text: {
    color: '#000',
    marginBottom: 20,
    fontSize: 20,
  },
});
