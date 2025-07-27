import { useAppTheme } from '@/hooks/useAppTheme';
import * as Haptics from 'expo-haptics';
import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

export const PressableSurface = ({ children, onPress, style }: Props) => {
  const theme = useAppTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={(event) => {
          Haptics.selectionAsync();
          onPress?.(event);
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          {
            backgroundColor: theme.colors.primary,
          },
          style,
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};
