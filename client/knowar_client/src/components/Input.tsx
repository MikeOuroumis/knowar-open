import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function Input(props) {
  return (
    <TextInput
      placeholder={props.placeholder}
      style={styles.input}
      placeholderTextColor="#000"
      keyboardType={props.keyboardType}
      secureTextEntry={props.secureTextEntry}
      onChangeText={props.onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'white',
    textAlign: 'center',
    borderRadius: 20,
    height: 45,
    borderStyle: 'solid',
    borderWidth: 0.5,
    marginHorizontal: 35,
    color: '#000',
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: 'white',
  },
});
