import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
    icon: ReactNode,
    title: string,
    action: () => void
    actionIcon?: any 
}

export default function MenuItem({ icon, title, action, actionIcon}: Props) {
    const theme = useAppTheme();

    const styles = StyleSheet.create({
        root: {
            height: theme.spacing.xl,
            paddingHorizontal: theme.spacing.xs,
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.xs,
            borderRadius: theme.borderRadius
        }
    })

    const onPressMenuItem = async () => {
        Haptics.impactAsync();
        action();
    }
    

    return (
        <Pressable onPress={onPressMenuItem} style={({pressed}) =>  [styles.root, {backgroundColor: pressed ? 'rgba(255, 122, 83, 0.7)' : undefined}]}>
            {icon}
            <ThemedText variant="bold" size={theme.fontSizes.small} style={{flex: 1}}>{title}</ThemedText>
            {actionIcon || <Ionicons name="return-down-forward-sharp" size={24} color="black" />}
        </Pressable>
    )
}