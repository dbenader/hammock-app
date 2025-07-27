import { useAppTheme } from "@/hooks/useAppTheme";
import Tenant from "@/types/Tenant";
import { formatUSD } from "@/util/lib";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Keyboard, Modal, ScrollView, StyleSheet, View } from "react-native";
import Avatar from "./Avatar";
import InputField from "./InputField";
import { PressableSurface } from "./PressableSurface";
import { ThemedPressable } from "./ThemedPressable";
import { ThemedText } from "./ThemedText";

type Props = {
    visible: boolean,
    onCreateGroup: (tenants: Tenant[]) => void,
    close: () => void
};

type NewTenant = {
    name: string;
    email: string;
};

export default function NewRentGroupModal({ visible, onCreateGroup, close }: Props) {
    const [newTenants, setNewTenants] = useState<NewTenant[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [frequency, setFrequency] = useState<string>('monthly');

    const theme = useAppTheme();

    const styles = StyleSheet.create({
        header: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: theme.gutterPadding
        },
        content: {
            flex: 1,
            padding: theme.gutterPadding,
        },
        avatars: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
        }
    });

    const handleAddTenant = () => {
        if (name.trim() && email.trim()) {
            setNewTenants(prev => [...prev, { name: name.trim(), email: email.trim() }]);
            setName('');
            setEmail('');
            Keyboard.dismiss();
        }
    };

    const onClose = () => {
        setNewTenants([]);
        setName('');
        setEmail('')
        close();
    }

    return (
        <Modal
            visible={visible}
            presentationStyle="formSheet"
            animationType="slide"
            onRequestClose={close}
        >
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={styles.header}>
                    <PressableSurface onPress={onClose} style={{
                        width: theme.spacing.lg,
                        height: theme.spacing.lg,
                        borderRadius: theme.spacing.lg / 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Ionicons name="close" size={theme.spacing.md} color={theme.colors.text} />
                    </PressableSurface>
                </View>

                <ScrollView style={styles.content} contentContainerStyle={{gap: theme.spacing.md, paddingBottom: 100}}>
                    <ThemedText variant="bold" size={theme.fontSizes.large}>Group details</ThemedText>
                    <View>
                        <InputField
                            label="Name"
                            value={name}
                            type="text"
                            onChange={setName}
                            placeholder="APT 4T"
                            position='single'
                        />
                    </View>

                    
                    <ThemedText variant="bold" size={theme.fontSizes.large}>Tenants</ThemedText>
                    <View>
                        <InputField
                            label="Name"
                            value={name}
                            type="text"
                            onChange={setName}
                            placeholder="Jack Brown"
                            position="top"
                        />
                        <View style={{ borderBottomWidth: 1, borderColor: '#d9c7ad' }} />
                        <InputField
                            label="Email"
                            value={email}
                            type="text"
                            onChange={val => {
                                setEmail(val);
                                if (name && val.includes('@')) {
                                    handleAddTenant();
                                }
                            }}
                            placeholder="cat@hammock.app"
                            position="bottom"
                        />
                    </View>



                    <ThemedText variant="bold" size={theme.fontSizes.large}>Payment plan</ThemedText>
                    <View>
                        <InputField
                            label="Amount"
                            value={amount.toString()}
                            type="text"
                            onChange={setAmount}
                            placeholder="$1200"
                            position="top"
                            onBlur={() => {
                                const num = parseFloat(amount.replace(/[^0-9.]/g, ''));
                                if (!isNaN(num)) {
                                setAmount(formatUSD(num)); // nicely formatted
                                }
                            }}
                        />
                        <View style={{ borderBottomWidth: 1, borderColor: '#d9c7ad' }} />
                        <InputField
                            label="Due date"
                            value={dueDate}
                            type="date"
                            onChange={setDueDate}
                            position="middle"
                        />
                        <View style={{ borderBottomWidth: 1, borderColor: '#d9c7ad' }} />
                        <InputField
                            label="How often"
                            value={frequency}
                            type="menu"
                            options={['one time', 'daily', 'weekly', 'monthly']}
                            onChange={setFrequency}
                            position="bottom"
                        />
                    </View>


                    <View style={{gap: theme.spacing.xs}}>
                        <ThemedText variant="regular" color="#888" size={theme.fontSizes.xsmall}>Optional</ThemedText>
                        <InputField
                            label="End date"
                            value={dueDate}
                            type="date"
                            onChange={setDueDate}
                            position='single'
                        />
                    </View>

                    <View style={{ height: 60 }}>
                        {newTenants.length > 0 && (
                            <View style={styles.avatars}>
                                {newTenants.map((t, i) => (
                                    <Avatar key={i} name={t.name} size={40} />
                                ))}
                            </View>
                        )}
                    </View>
                    <ThemedPressable
                        style={{ height: 55 }}
                        onPress={() => {
                            if (newTenants.length > 0) {
                                // TODO
                                close();
                            }
                        }}
                    >
                        <ThemedText variant="bold">Create Group</ThemedText>
                    </ThemedPressable>
                </ScrollView>
            </View>
        </Modal>
    );
}
