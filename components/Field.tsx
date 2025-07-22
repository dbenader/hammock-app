import { useAppTheme } from "@/hooks/useAppTheme";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
    value: string,
    onChangeText: (text: string) => void,
    label: string
} & TextInputProps


export default function Field({value, onChangeText, label, ...rest}: Props) {
    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {
            height: theme.spacing.xl,
            borderWidth: 2, 
            borderColor: theme.colors.text,
            fontFamily: theme.fonts.regular.fontFamily,
            borderRadius: theme.borderRadius,
            backgroundColor: '#FFF'
        }
    })

    return (
        <View style={{gap: theme.spacing.xs}}>
            <ThemedText variant="bold" size={theme.fontSizes.small}>{label}</ThemedText>
            <TextInput style={styles.root}/>
        </View>
    )
}