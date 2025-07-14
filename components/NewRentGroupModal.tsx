import { useAppTheme } from "@/hooks/useAppTheme";
import Tenant from "@/types/Tenant";
import { Modal, StyleSheet, View } from "react-native";

type Props = {
    visible: boolean,
    onCreateGroup: (tenant:Tenant) => void,
    close: ()=>void
}

export default function NewRentGroupModal({visible, onCreateGroup, close}: Props) {

    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {

        }
    })

    return (
        <Modal visible={visible}
        presentationStyle='formSheet'
        animationType='slide'
        onRequestClose={close}>
            <View style={{flex: 1 }}>

            </View>

        </Modal>
    )
}