import { HapticTab } from '@/components/HapticTab';
import { useAppTheme } from '@/hooks/useAppTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

export default function TabLayout() {
    const theme = useAppTheme();

    return (
        <Tabs 
        screenOptions={{
            headerShown: false, 
            tabBarActiveTintColor: theme.colors.primary,
            tabBarButton: HapticTab,
            tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            elevation: 0, // For Android
            borderTopWidth: 0
            },
            tabBarBackground: () => (
            <BlurView
                tint={'light'} 
                intensity={Platform.OS === 'ios' ? 40 : 60}
                style={StyleSheet.absoluteFill}
            />
            )
            }} initialRouteName='transactions'>
            <Tabs.Screen name="transactions" 
            options={{
                title: 'Transactions',
                tabBarIcon: ({color}) => <MaterialIcons name="attach-money" size={24} color={color}/>
            }}/>
            <Tabs.Screen name="tenants"
            options={{
                title: 'tenants',
                tabBarIcon: ({color}) => <Ionicons name="people-circle-outline" size={24} color={color} />
            }}/>
            <Tabs.Screen name="profile"
            options={{
                title: 'profile',
                tabBarIcon: ({color}) => <Ionicons name="person-circle-outline" size={24} color={color} />
            }}/>
        </Tabs>
    )
}