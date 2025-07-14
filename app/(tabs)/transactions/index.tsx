import { ThemedText } from "@/components/ThemedText";
import TransactionListItem from "@/components/TransactionListItem";
import { useAppTheme } from "@/hooks/useAppTheme";
import TransactionService from "@/services/TransactionService";
import PaginatedResponse from "@/types/PaginatedResponse";
import Transaction from "@/types/Transaction";
import { formatUSD } from "@/util/lib";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MenuView } from '@react-native-menu/menu';
import * as Haptics from 'expo-haptics';
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Transactions() {
    const USER_ID = '69d5799e-2000-4d27-8465-0b8aad0b9311';
    let [transactions, setTransactions] = useState<PaginatedResponse<Transaction>>();
    let [total, setTotal] = useState<number>(0);
    let [period, setPeriod] = useState<'yearly' | 'monthly' | 'weekly' | 'all time'>('monthly');

    useEffect(() => {
        loadTransactions(period);
    }, [period]);


    const loadTransactions = async (period: 'yearly' | 'monthly' | 'weekly' | 'all time') => {
        try {
            let data = await TransactionService.listTransactions(period, USER_ID);
            const total = data.content.reduce((sum, item) => sum + item.amountCents, 0);
            setTotal(total / 100)
            setTransactions(data);
        } catch(error) {
            console.log('error', error)
        }
    }



    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {
            backgroundColor: theme.colors.background,
            flex: 1
        },
        header: {
            padding: theme.gutterPadding,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        }
    })

    
    return (
        <SafeAreaView edges={["top"]} style={styles.root}>
            <View style={styles.header}>
                <MenuView
                title=""
                onPressAction={({nativeEvent}) => {
                    Haptics.selectionAsync()
                    console.log('event', nativeEvent.event)
                }}
                actions={[
                    {
                        id: 'monthly',
                        title: 'Monthly'
                    },
                    {
                        id: 'yearly',
                        title: 'Yearly'
                    },
                    {
                        id: 'all time',
                        title: 'All Time'
                    }
                ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255, 122, 83, 0.7)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: theme.borderRadius}}>
                        <ThemedText variant="bold">Monthly</ThemedText>
                        <FontAwesome name="caret-down" size={20} color="black" />
                    </View>
                </MenuView>
                <View style={{alignItems:'flex-end', top: -5}}>
                    <ThemedText variant="bold" size={theme.fontSizes.xlarge}>{formatUSD(total)}</ThemedText>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <ThemedText>Collected</ThemedText>
                        <View style={{height: theme.spacing.md, width: theme.spacing.md, backgroundColor: theme.colors.card, justifyContent: 'center', alignItems: 'center', borderRadius: theme.spacing.md/2}}>
                            <Image source={require('@/assets/images/money-bag.png')} style={{width: 15, height: 15}}/>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList
            keyExtractor={(item) => item.id}
            data={transactions?.content}
            renderItem={({item}) => <TransactionListItem transaction={item}/>}
            style={{flex: 1}}/>
        </SafeAreaView>
    )
}