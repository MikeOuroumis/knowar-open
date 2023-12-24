import React, {useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR_LIST} from '../../constants/colors';
import {useGameContext} from '../../store/GameContext';

type TimeBarProps = {
  onTimeElapsed: () => void;
};

export function TimeBar({onTimeElapsed}: TimeBarProps) {
  const overlayWidthAnim = useRef(new Animated.Value(0)).current;
  const {resetTimerKey} = useGameContext();

  const runAnimation = useCallback(() => {
    overlayWidthAnim.setValue(0); // Reset the animation
    Animated.timing(overlayWidthAnim, {
      toValue: 100,
      duration: 10000, // 10 seconds
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        onTimeElapsed();
      }
    });
  }, [overlayWidthAnim, onTimeElapsed]);

  // Reset and restart the timer when resetTimerKey changes
  useEffect(() => {
    runAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTimerKey]);

  const animatedOverlayWidth = overlayWidthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.timeBar}>
      <LinearGradient
        colors={[
          COLOR_LIST.deepBlue,
          COLOR_LIST.brightPurple,
          COLOR_LIST.neonPink,
          COLOR_LIST.electricBlue,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.overlay, {width: animatedOverlayWidth}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  timeBar: {
    marginTop: 20,
    height: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
});
