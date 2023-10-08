import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import {COLORS} from '../constants/colors';

interface ButtonComponentProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export default function ButtonComponent({
  onPress,
  title,
  disabled,
}: ButtonComponentProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor:
            pressed && !disabled ? '#2563bb' : COLORS.primaryBlue,
          opacity: disabled ? 0.5 : 1, // Add opacity based on disabled prop
        },
        styles.button,
      ]}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    borderRadius: 20,
    height: 45,
    marginHorizontal: 35,
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
