import React from 'react';
import {StyleSheet, Text, Pressable, ViewStyle, TextStyle} from 'react-native';
import {COLOR_LIST} from '../constants/colors';

interface ButtonComponentProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function ButtonComponent({
  onPress,
  title,
  style,
  textStyle,
  disabled,
}: ButtonComponentProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed && !disabled ? 0.5 : disabled ? 0.5 : 1,
          // opacity: disabled ? 0.5 : 1,
        },
        styles.button,
        style,
      ]}
      disabled={disabled}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR_LIST.neonPink,
    shadowColor: COLOR_LIST.neonPink,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 10,
    borderRadius: 20,
    height: 45,
    marginHorizontal: 35,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
