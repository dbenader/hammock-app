import { useAppTheme } from "@/hooks/useAppTheme";
import Transaction from "@/types/Transaction";
import dayjs from 'dayjs';
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Avatar from "./Avatar";
import { ThemedText } from "./ThemedText";

type Props = {
    transaction: Transaction
}

export default function TransactionListItem({transaction}: Props) {
    const router = useRouter();
    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {
            height: 90,
            paddingHorizontal: theme.spacing.sm,
            width: '100%',
            justifyContent: 'center'
        }
    })

    const renderStatusIcon = (status: string) => {
        if (status === 'SUCCEEDED') return '✅';
        else if (status === 'FAILED') return '❌';
        else return '⏱️';
    }

    const onPressTransaction = (transactionId: string) => {
        router.navigate(`/transactions/${transactionId}`);
    }

    return (
        <Pressable onPress={()=>onPressTransaction(transaction.id)} style={({pressed}) => [styles.root, {backgroundColor: pressed ? 'rgba(255, 122, 83, 0.7)' : undefined, borderRadius: pressed ? theme.borderRadius : undefined}]}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs, height: '100%'}}>
                <Avatar size={theme.spacing.xl} name={transaction.tenantName}/>
                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, borderBottomWidth: 0.5, borderColor: theme.colors.border, height: '100%'}}>
                    <View style={{flex: 1, gap: 3}}>
                        <ThemedText variant="bold">{transaction.tenantName}</ThemedText>
                        <ThemedText size={11}>{dayjs(transaction.createdAt).format("MMM D hh:mma")}</ThemedText>
                    </View>
                    <View>
                        <ThemedText style={{color: 'green'}}>{`+$${transaction.amountCents / 100}  ${renderStatusIcon(transaction.status)}`}</ThemedText>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}