import { useAppTheme } from "@/hooks/useAppTheme";
import getInitials from '@/util/lib';
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
    name: string,
    size: number
}


export default function Avatar({name, size}: Props) {
    const theme = useAppTheme();
    const { hsl: backgroundColor, lightness } = getHSLFromString(name);
    const textColor = lightness < 50 ? '#fff' : '#000';

    function getHSLFromString(str: string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        const hue = Math.abs(hash) % 360;
        const saturation = 65;
        const lightness = 55;

        return {
            hsl: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            lightness,
        };
    }

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
            <ThemedText variant="bold" style={styles.text}>{getInitials(name)}</ThemedText>
        </View>
    )
}