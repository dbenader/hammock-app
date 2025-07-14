import { useAppTheme } from "@/hooks/useAppTheme";
import getInitials from '@/util/lib';
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
    name: string,
    size: number,
    group?: boolean
}


export default function Avatar({name, size, group=false}: Props) {
    const theme = useAppTheme();



    const styles = StyleSheet.create({
        root: {
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: size /2,
            height: size,
            width: size,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: size * 0.33,
            color: theme.colors.text,
        },
    });


    return (
        <View style={styles.root}>
            {group ? (
                <MaterialIcons name="groups" size={18} color={theme.colors.text} />
            ) : (
                <ThemedText variant="bold" style={styles.text}>{getInitials(name)}</ThemedText>
            )}
        </View>
    )
}