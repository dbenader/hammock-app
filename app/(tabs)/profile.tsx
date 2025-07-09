import Avatar from "@/components/Avatar";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {
            padding: theme.gutterPadding
        }
    })
    return (
        <SafeAreaView edges={["top"]} style={styles.root}>
            <View style={{ alignItems: 'center'}}>
                <View style={{alignItems: 'center'}}>
                    <Avatar name="Daniel Benaderet" size={130}/>
                    <ThemedText>dbenaderet@yahoo.com</ThemedText>
                </View>
            </View>
        </SafeAreaView>
    )
}