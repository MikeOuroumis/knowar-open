import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {COLOR_LIST} from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonComponentProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function ButtonComponent({
  onPress,
  title,
  style,
  textStyle,
  disabled,
  isLoading,
}: ButtonComponentProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const getGradientStyle = () => {
    if (disabled) {
      return [styles.gradient, styles.disabled, style];
    }
    if (isPressed) {
      return [styles.gradient, styles.pressed, style];
    }
    return [styles.gradient, style];
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}>
      <LinearGradient
        colors={[COLOR_LIST.neonPink, COLOR_LIST.softPink]}
        style={getGradientStyle()}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={COLOR_LIST.white} />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    shadowColor: COLOR_LIST.softPink,
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 10,
    borderRadius: 20,
    height: 45,
    marginHorizontal: 35,
    justifyContent: 'center',
    marginTop: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
