import Avatar from "@/components/Avatar";
import MenuItem from "@/components/MenuItem";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {
            padding: theme.gutterPadding,
            gap: theme.spacing.sm,
            flex: 1
        }
    })
    return (
        <SafeAreaView edges={["top"]} style={styles.root}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{gap: theme.spacing.md}}>
                <View style={{ alignItems: 'center', gap: theme.spacing.sm}}>
                    <View style={{alignItems: 'center'}}>
                        <Avatar name="Daniel Benaderet" size={130}/>
                        <ThemedText>dbenaderet@yahoo.com</ThemedText>
                    </View>
                </View>

                <View>
                    <MenuItem 
                        title="Personal Info"
                        icon={<Text>🙋‍♂️</Text>}
                        action={()=> {}}
                        />
                    <MenuItem 
                        title="Bank Account"
                        icon={<Text>🏦</Text>}
                        action={()=> {}}
                        />
                </View>

                <View>
                    <ThemedText variant="bold" size={theme.fontSizes.medium}>Legal</ThemedText>
                    <MenuItem 
                    title="Terms of Service"
                    icon={<Text>📝</Text>}
                    action={()=>{}}
                    />
                    <View style={{height: 1, borderWidth: 0.5, borderColor: theme.colors.primary}}/>
                    <MenuItem 
                    title="Privacy Policy"
                    icon={<Text>👨🏽‍💻</Text>}
                    action={()=>{}}
                    />
                </View>

                <View>
                    <ThemedText variant="bold" size={theme.fontSizes.medium}>Account</ThemedText>
                    <MenuItem 
                    title="Sign out"
                    icon={<Text>🚪</Text>}
                    action={()=>{}}
                    />
                    <View style={{height: 1, borderWidth: 0.5, borderColor: theme.colors.primary}}/>
                    <MenuItem 
                    title="Delete account"
                    icon={<Text>🗑️</Text>}
                    action={()=>{}}
                    />
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}