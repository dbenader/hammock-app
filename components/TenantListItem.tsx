import { useAppTheme } from "@/hooks/useAppTheme";
import { TenantWithPaymentRule } from "@/types/TenantWithPaymentRule";
import { formatUSD, shortenFrequency } from "@/util/lib";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
    tenant: TenantWithPaymentRule
}

export default function TenantListItem({tenant}: Props) {
    const theme = useAppTheme();
    const router = useRouter();
    const styles = StyleSheet.create({
        root: {
            paddingHorizontal: theme.gutterPadding,
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.borderRadius,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            justifyContent: 'center',
            height: 90
        }
    });



    return (
        <Pressable onPress={()=>{}} style={({pressed}) => [styles.root, {backgroundColor: pressed ? 'rgba(255, 122, 83, 0.7)' : undefined, borderRadius: pressed ? theme.borderRadius : undefined}]}>
            <View style={{gap: theme.spacing.xs}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <ThemedText variant="bold" size={theme.fontSizes.small}>{tenant.name}</ThemedText>
                    <ThemedText size={theme.fontSizes.xsmall}>
                    {tenant.paymentRule
                        ? `${formatUSD(tenant.paymentRule.amountCents / 100)}/${shortenFrequency(tenant.paymentRule.frequency)}`
                        : "No payment rule"}
                    </ThemedText>
                 </View>
            </View>
        </Pressable>
    );
}