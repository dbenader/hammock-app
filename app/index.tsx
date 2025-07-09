import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@react-navigation/native";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Landing() {
    const theme = useTheme();
    const router = useRouter();

    const styles = StyleSheet.create({
        root: {
            backgroundColor: theme.colors.background,
            flex: 1
        }
    })

    const onPressContinue = () =>{
        router.navigate('/transactions')
    }
    


    return (
        <View style={styles.root}>
            <SafeAreaView edges={["top"]} style={{padding: 18, flex: 1}}>
                <Image source={require('@/assets/animations/cat-hammock.gif')} style={{height: 150, width: 150, alignSelf: 'center'}}/>
                <ThemedText variant="bold" size={34} style={{alignSelf: 'center'}}>Hammock</ThemedText>
                <View style={{flex: 1}}/>
                <View style={{gap: 8}}>
                    <ThemedPressable style={{height: 55}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15, flex: 1 }}>
                            <Image source={require('@/assets/images/google.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontFamily: 'SpaceMonoBold', fontSize: 16, color: '#4b2810' }}>Continue with Google</Text>
                        </View>
                    </ThemedPressable>
                    <ThemedPressable style={{height: 55}} onPress={onPressContinue}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15, flex: 1 }}>
                            <Image source={require('@/assets/images/apple.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontFamily: 'SpaceMonoBold', fontSize: 16, color: '#4b2810' }}>Continue with Apple</Text>
                    </View>
                    </ThemedPressable>
                </View>
            </SafeAreaView>
        </View>
    )
}