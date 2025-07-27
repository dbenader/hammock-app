import { useAppTheme } from "@/hooks/useAppTheme";
import RentGroupService from "@/services/RentGroupService";
import TenantService from "@/services/TenantService";
import CreateTenantRequest from "@/types/CreateTenantRequest";
import RentGroup from "@/types/RentGroup";
import Tenant from "@/types/Tenant";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
    const USER_ID = '69d5799e-2000-4d27-8465-0b8aad0b9311';
    let [name, setName] = useState<string>('');
    let [email, setEmail] = useState<string>('');
    let [amount, setAmount] = useState<string>('');
    let [dueDate, setDueDate] = useState<Date>(new Date());
    let [frequency, setFrequency] = useState<string>('monthly');
    let [rentGroups, setRentGroups] = useState<RentGroup[]>([]);
    let [paymentPlanType, setPaymentPlanType] = useState<'solo' | 'group'>('solo');
    let [selectedGroupId, setSelectedGroupId] = useState<string>();

    useEffect(() => {
        if (USER_ID) fetchRentGroups(USER_ID);
    }, [])


    const fetchRentGroups = async (userId: string) => {
        try {
            let data = await RentGroupService.listRentGroupsByUser(userId);
            setRentGroups(data);
        } catch (error) {
            console.log('error could not fetch rent groups', error)
        }
    }

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
        }, 
        radio: {
            height: theme.spacing.sm,
            width: theme.spacing.sm,
            borderWidth: 1,
            borderRadius: theme.spacing.sm/2,
            borderColor: theme.colors.text
        },
        inactive: {
            backgroundColor: theme.colors.tint
    
        }
    })
    
    const onPressCreate = async () => {
        try {
            let request: CreateTenantRequest = {
                name: name,
                email: email,
                amountCents: 0,
                dueDate: dayjs(dueDate).toISOString(),
                frequency: "MONTHLY",
                userId: USER_ID
            }
            let response = await TenantService.createTenantWithPaymentPlan(request);
        } catch (error) {

        }
    }

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
                        <InputField label="Name"  value={name} type='text' onChangeText={setName} placeholder="Jack Brown" position="top"/>
                        <View style={{borderBottomWidth: 1, borderColor: '#d9c7ad'}}/>
                        <InputField keyboardType='email-address' label="Email"  value={email} type='text' onChangeText={setEmail} placeholder="cat@hammock.app" position="bottom"/>
                    </View>

                    <View style={{gap: theme.spacing.xs, flexDirection: 'row', alignItems: 'center'}}>
                        <PressableSurface onPress={()=>setPaymentPlanType('solo')} style={[{paddingVertical: 5, paddingHorizontal: 8, borderRadius: theme.borderRadius}, paymentPlanType === 'group' && styles.inactive]}>
                            <ThemedText variant='regular' size={theme.fontSizes.small}>Solo payment plan</ThemedText>
                        </PressableSurface>

                        <PressableSurface onPress={()=>setPaymentPlanType('group')} style={[{paddingVertical: 5, paddingHorizontal: 8,   borderRadius: theme.borderRadius }, paymentPlanType === 'solo' && styles.inactive]}>
                             <ThemedText variant='regular' size={theme.fontSizes.small}>Add to group</ThemedText>
                        </PressableSurface>

                    </View>

                    {paymentPlanType === 'solo' && (
                        <>
                        <ThemedText variant="bold" size={theme.fontSizes.large}>New payment plan</ThemedText>
                        <View>
                            <InputField label="Amount"  value={amount} type='text' onChangeText={setAmount} placeholder="$1200" position="top"/>
                            <View style={{borderBottomWidth: 1, borderColor: '#d9c7ad'}}/>
                            <InputField label="Due date"  value={dueDate} type='date' onChange={setDueDate} position="middle"/>
                            <View style={{borderBottomWidth: 1, borderColor: '#d9c7ad'}}/>
                            <InputField label="How often" value={frequency} type="menu" options={[{label: 'one time', value: 'ONE_TIME'}, {label: 'daily', value: 'DAILY'}, {label: 'weekly', value: 'WEEKLY'}, {label: 'monthly', value: 'monthly'}]} onChange={setFrequency} position="bottom"/>
                        </View>
                        </>
                    )}

                    {paymentPlanType === 'group' && (
                        <>
                        <ThemedText variant="bold" size={theme.fontSizes.large}>Group payment plan</ThemedText>
                        <View>
                            <InputField position='single' onChange={setSelectedGroupId} type='menu' label="Which group?" value={rentGroups.length > 0 ? rentGroups[0].name : ''} options={rentGroups.map((group) => { return {label: group.name, value: group.id}})}/>
                        </View>
                        </>
                    )}


                    <View style={{height: 60}}/>
                    
                    <ThemedPressable disabled={name.length === 0 || email.length === 0} style={{height: 55}} onPress={onPressCreate}>
                        <ThemedText variant="bold">Create</ThemedText>
                    </ThemedPressable>
                </ScrollView>
            </View>
        </Modal>
    )
}