import Avatar from "@/components/Avatar";
import { PressableSurface } from "@/components/PressableSurface";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import TransactionService from "@/services/TransactionService";
import Transaction from "@/types/Transaction";
import { capitalizeFirst, formatUSD, renderStatusIcon } from "@/util/lib";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function TransactionDetails() {
    const router = useNavigation();
    const { id } = useLocalSearchParams();
    const theme = useAppTheme();
    const [transaction, setTransaction] = useState<Transaction>();

    useEffect(() => {
        if (typeof id === 'string') {
            fetchTransaction(id);
        }
    }, [id])

    const fetchTransaction = async (id: string) => {
        try {
            let t = await TransactionService.getTransactionById(id);
            setTransaction(t);
        } catch (error) {

        }
    }

    if (!transaction) return;

    return (
        <SafeAreaView edges={["top"]} style={{flex: 1, padding: theme.gutterPadding, gap: theme.spacing.md}}>
            <PressableSurface onPress={()=>router.goBack()} style={{width: theme.spacing.lg, height: theme.spacing.lg, borderRadius: theme.spacing.lg/2, justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="caret-back" size={theme.spacing.md} color={theme.colors.text} />
            </PressableSurface>
            <View style={{alignItems: 'center', gap: theme.spacing.xs}}>
                <Avatar name={transaction?.tenantName} size={theme.spacing.xxl}/>
                <ThemedText>{transaction.tenantName}</ThemedText>
                <ThemedText size={theme.fontSizes.xsmall}>{transaction.email}</ThemedText>
                <ThemedText variant="bold" size={theme.fontSizes.medium} style={{color: 'green'}}>{formatUSD(transaction.amountCents / 100)}</ThemedText>
            </View>

            <View style={{borderTopWidth: 1, borderColor: theme.colors.primary}}/>

            <View style={{gap: 3}}>
                <ThemedText size={theme.fontSizes.xsmall}>Status</ThemedText>
                <ThemedText variant="bold">{`${capitalizeFirst(transaction.status)} ${renderStatusIcon(transaction.status)}`}</ThemedText>
            </View>
            
            <View style={{gap: 3}}>
                <ThemedText size={theme.fontSizes.xsmall}>Transaction details</ThemedText>
                <ThemedText variant="bold">Submitted <ThemedText>{dayjs(transaction.createdAt).format('MMMM D, YYYY, h:mma')}</ThemedText></ThemedText>
                <ThemedText variant="bold">Received <ThemedText>{dayjs(transaction.receivedAt).format('MMMM D, YYYY, h:mma')}</ThemedText></ThemedText>
            </View>

            <View style={{gap: 3}}>
                <ThemedText size={theme.fontSizes.xsmall}>Type of Transaction</ThemedText>
                <ThemedText variant="bold">ACH</ThemedText>
            </View>

            <View style={{gap: 3}}>
                <ThemedText size={theme.fontSizes.xsmall}>Transaction Id</ThemedText>
                <ThemedText variant="bold">{transaction.id}</ThemedText>
            </View>
        </SafeAreaView>
    )
}