import { Stack } from 'expo-router';

export default function TransactionsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'card',
        animation: 'slide_from_right',
        headerShown: false
      }}
    />
  );
}
