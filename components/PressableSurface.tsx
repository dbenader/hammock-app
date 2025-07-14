import { useAppTheme } from '@/hooks/useAppTheme';
import * as Haptics from 'expo-haptics';
import React, { ReactNode } from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleProp,
    ViewStyle
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
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
    scale.value = withSpring(0.96, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
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
            backgroundColor: 'rgba(255, 122, 83, 0.7)',
          },
          style,
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};
