import { useTheme } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';
import React, { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

type Props = {
  children: ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
} & PressableProps;

export const ThemedPressable = ({ children, onPress, style, loading=false, ...rest }: Props) => {
  const scale = useSharedValue(1);
  const theme = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        disabled={rest.disabled || loading}
        style={({ pressed }) => [
          {
            backgroundColor: rest.disabled ? '#f1f1f1' : theme.colors.primary,
            borderRadius: 8,
            borderColor: '#4b2810',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            // allow outer container to control layout
            flex: 1,
          },
        ]}
        onPress={(event) => {
          Haptics.selectionAsync();
          onPress?.(event);
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...rest}
      >
        {loading ? (
            <LottieView
                autoPlay
                loop
                source={require('@/assets/animations/food-loader.json')}
                style={{height: 30, width: 30, alignSelf: 'center'}}
            />
        ) : children}
      </Pressable>
    </Animated.View>
  );
};

