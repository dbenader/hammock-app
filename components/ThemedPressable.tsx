import { useTheme } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children: ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
} & PressableProps;

export const ThemedPressable = ({
  children,
  onPress,
  style,
  loading = false,
  ...rest
}: Props) => {
  const scale = useSharedValue(1);
  const theme = useTheme();

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
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        disabled={rest.disabled || loading}
        style={({ pressed }) => [
          {
            backgroundColor: rest.disabled ? '#f1f1f1' : 'rgba(255, 122, 83, 0.7)',
            borderRadius: 8,
            borderColor: '#4b2810',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
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
        {loading ? <ActivityIndicator size="small" /> : children}
      </Pressable>
    </Animated.View>
  );
};
