import { useAppTheme } from "@/hooks/useAppTheme";
import RentGroupSummary from "@/types/RentGroupSummary";
import { capitalizeFirst, formatUSD } from "@/util/lib";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import Avatars from "./Avatars";
import { ThemedText } from "./ThemedText";

type Props = {
    rentGroupSummary: RentGroupSummary
}

export default function RentGroupListItem({rentGroupSummary}: Props) {
    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {
            paddingHorizontal: theme.gutterPadding,
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.borderRadius,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border
        }
    });
    return (
        <View style={styles.root}>
            <View style={{gap: theme.spacing.xs}}>
                <ThemedText variant="bold" size={theme.fontSizes.small}>{rentGroupSummary.name}</ThemedText>
                {rentGroupSummary.tenants.length > 0 && <Avatars names={rentGroupSummary.tenants.map(t => t.name)} size={theme.spacing.lg}/>}
                <View style={{flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, justifyContent: 'flex-end'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <View style={{height: theme.spacing.md, width: theme.spacing.md, backgroundColor: theme.colors.card, justifyContent: 'center', alignItems: 'center', borderRadius: theme.spacing.md/2}}>
                            <Image source={require('@/assets/images/calendar.png')} style={{width: 15, height: 15}}/>
                        </View>
                        <ThemedText size={theme.fontSizes.xsmall} variant="bold">{capitalizeFirst(rentGroupSummary.paymentRule.frequency)}</ThemedText>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <View style={{height: theme.spacing.md, width: theme.spacing.md, backgroundColor: theme.colors.card, justifyContent: 'center', alignItems: 'center', borderRadius: theme.spacing.md/2}}>
                            <Image source={require('@/assets/images/money-bag.png')} style={{width: 15, height: 15}}/>
                        </View>
                        <ThemedText size={theme.fontSizes.xsmall} variant="bold">{formatUSD(rentGroupSummary.paymentRule.amountCents / 100)}</ThemedText>
                    </View>
                </View>
            </View>
        </View>
    );
}