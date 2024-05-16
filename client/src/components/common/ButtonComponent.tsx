import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {colorList} from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonComponentProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'default' | 'bluish';
}

export default function ButtonComponent({
  onPress,
  title,
  style,
  textStyle,
  disabled,
  isLoading,
  variant = 'default',
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
    return variant === 'bluish'
      ? [styles.buttonBase, styles.bluishGradient, style]
      : [styles.buttonBase, styles.gradient, style];
  };

  const gradientColors =
    variant === 'bluish'
      ? [colorList.vibrantCyan, colorList.electricBlue]
      : [colorList.neonPink, colorList.softPink];

  const buttonTextStyle =
    variant === 'bluish'
      ? [styles.textBase, styles.bluishButtonText, textStyle]
      : [styles.textBase, styles.buttonText, textStyle];

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}>
      <LinearGradient
        colors={gradientColors}
        style={getGradientStyle()}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colorList.white} />
        ) : (
          <Text style={buttonTextStyle}>{title}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    shadowRadius: 3,
    elevation: 10,
    borderRadius: 20,
    height: 45,
    marginHorizontal: 35,
    justifyContent: 'center',
    marginTop: 20,
    shadowOpacity: 1,
  },
  gradient: {
    shadowColor: colorList.softPink,
  },
  bluishGradient: {
    shadowColor: colorList.electricBlue,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  textBase: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    color: colorList.white,
  },
  bluishButtonText: {
    color: colorList.black,
  },
});
