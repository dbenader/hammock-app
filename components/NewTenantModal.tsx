import { useAppTheme } from "@/hooks/useAppTheme";
import Tenant from "@/types/Tenant";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Modal, StyleSheet, View } from "react-native";
import { PressableSurface } from "./PressableSurface";
import { ThemedText } from "./ThemedText";

type Props = {
    visible: boolean,
    onCreateTenant: (tenant:Tenant) => void,
    close: ()=>void
}

export default function NewTenantModal({visible, onCreateTenant, close}: Props) {

    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {

        },
        header: {
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            justifyContent: 'center',
        }
    })

    return (
        <Modal visible={visible}
        presentationStyle='formSheet'
        animationType='slide'
        onRequestClose={close}>
            <View style={{flex: 1 }}>
                <View style={styles.header}>
                    <ThemedText style={{alignSelf: 'center'}}  variant="bold">Create Tenant</ThemedText>
                    <PressableSurface onPress={()=>{}} style={{width: theme.spacing.lg, height: theme.spacing.lg, borderRadius: theme.spacing.lg/2, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: theme.gutterPadding, top: -24}}>
                        <Ionicons name="close" size={theme.spacing.md} color={theme.colors.text} />
                    </PressableSurface>
                </View>
            </View>
        </Modal>
    )
}