import { useAppTheme } from "@/hooks/useAppTheme";
import { TenantWithPaymentPlan } from "@/types/TenantWithPaymentPlan";
import { formatUSD, shortenFrequency } from "@/util/lib";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Avatar from "./Avatar";
import { ThemedText } from "./ThemedText";

type Props = {
    tenant: TenantWithPaymentPlan
}

export default function TenantListItem({tenant}: Props) {
    const theme = useAppTheme();
    const router = useRouter();
    const styles = StyleSheet.create({
        root: {
            paddingHorizontal: theme.gutterPadding,
            borderRadius: theme.borderRadius,
            justifyContent: 'center',
            height: 90
        }
    });



    return (
        <Pressable onPress={()=>{}} style={({pressed}) => [styles.root, {backgroundColor: pressed ? 'rgba(255, 122, 83, 0.7)' : undefined, borderRadius: pressed ? theme.borderRadius : undefined}]}>
            <View style={{gap: theme.spacing.xs, height: '100%', justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs, flex: 1}}>
                    <Avatar name={tenant.name} size={theme.spacing.xl}/>
                    <View style={{borderBottomWidth: 0.5, borderColor: theme.colors.border, height: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                        <ThemedText variant="bold" size={theme.fontSizes.small}>{tenant.name}</ThemedText>
                        <ThemedText size={10}>
                        {tenant.paymentPlan
                            ? `${formatUSD(tenant.paymentPlan.amountCents / 100)}/${shortenFrequency(tenant.paymentPlan.frequency)}`
                            : "No payment rule"}
                        </ThemedText>
                    </View>
                 </View>
            </View>
        </Pressable>
    );
}