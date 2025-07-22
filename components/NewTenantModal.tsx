import { useAppTheme } from "@/hooks/useAppTheme";
import Tenant from "@/types/Tenant";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import InputField from "./InputField";
import { PressableSurface } from "./PressableSurface";
import { ThemedPressable } from "./ThemedPressable";
import { ThemedText } from "./ThemedText";

type Props = {
    visible: boolean,
    onCreateTenant: (tenant:Tenant) => void,
    close: ()=>void
}

export default function NewTenantModal({visible, onCreateTenant, close}: Props) {
    let [name, setName] = useState<string>('');
    let [email, setEmail] = useState<string>('');
    let [amount, setAmount] = useState<string>('');
    let [dueDate, setDueDate] = useState<Date>(new Date());
    let [frequency, setFrequency] = useState<string>('monthly');

    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {

        },
        header: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: theme.gutterPadding
        },
        content: {
            flex: 1,
            padding: theme.gutterPadding,
        }
    })

    return (
        <Modal visible={visible}
        presentationStyle='formSheet'
        animationType='slide'
        onRequestClose={close}>
            <View style={{flex: 1, backgroundColor: theme.colors.background }}>
                <View style={styles.header}>
                    <PressableSurface onPress={close} style={{width: theme.spacing.lg, height: theme.spacing.lg, borderRadius: theme.spacing.lg/2, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name="close" size={theme.spacing.md} color={theme.colors.text} />
                    </PressableSurface>
                </View>
                <ScrollView style={styles.content} contentContainerStyle={{gap: theme.spacing.md, paddingBottom: 100}}>
                    <ThemedText variant="bold" size={theme.fontSizes.large}>Tenant details</ThemedText>

                    <View>
                        <InputField label="Name"  value={name} type='text' onChange={setName} placeholder="Jack Brown" position="top"/>
                        <View style={{borderBottomWidth: 1, borderColor: '#d9c7ad'}}/>
                        <InputField label="Email"  value={email} type='text' onChange={setEmail} placeholder="cat@hammock.app" position="bottom"/>
                    </View>

                    <ThemedText variant="bold" size={theme.fontSizes.large}>Payment details</ThemedText>
                    <View>
                        <InputField label="Amount"  value={amount} type='text' onChange={setAmount} placeholder="$1200" position="top"/>
                        <View style={{borderBottomWidth: 1, borderColor: '#d9c7ad'}}/>
                        <InputField label="Due date"  value={dueDate} type='date' onChange={setDueDate} position="middle"/>
                        <View style={{borderBottomWidth: 1, borderColor: '#d9c7ad'}}/>
                        <InputField label="How often" value={frequency} type="menu" options={['one time', 'daily', 'weekly', 'monthly']} onChange={setFrequency} position="bottom"/>
                    </View>

                    <View style={{height: 60}}/>
                    
                    <ThemedPressable style={{height: 55}}>
                        <ThemedText variant="bold">Create</ThemedText>
                    </ThemedPressable>
                </ScrollView>
            </View>
        </Modal>
    )
}