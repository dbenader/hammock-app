import { useAppTheme } from "@/hooks/useAppTheme";
import RentGroup from "@/types/RentGroup";
import RentGroupSummary from "@/types/RentGroupSummary";
import { formatUSD, shortenFrequency } from "@/util/lib";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
    rentGroupSummary: RentGroupSummary
}

export default function RentGroupListItem({rentGroupSummary}: Props) {
    const theme = useAppTheme();
    const router = useRouter();
    const styles = StyleSheet.create({
        root: {
            paddingHorizontal: theme.gutterPadding,
            borderRadius: theme.borderRadius,
            justifyContent: 'center',
            height: 90,
        }
    });


    const handleItemPress = (item: RentGroup) => {
        router.navigate(`/tenants/group/${item.id}`);
    };

    return (
        <Pressable onPress={()=>{}} style={({pressed}) => [styles.root, {backgroundColor: pressed ? 'rgba(255, 122, 83, 0.7)' : undefined, borderRadius: pressed ? theme.borderRadius : undefined}]}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '100%', gap: theme.spacing.xs}}>
                
                <View style={{height: theme.spacing.xl, width: theme.spacing.xl, justifyContent: 'center', alignItems: 'center', borderRadius: theme.spacing.xl/2, backgroundColor: theme.colors.tint}}>
                    <FontAwesome5 name="user-friends" size={theme.spacing.sm} color="#888" />
                </View>


                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, height: '100%', borderBottomWidth: 0.5, borderColor: theme.colors.border, flex: 1}}>
                    <View style={{flex: 1}}>
                        <ThemedText variant="bold" size={theme.fontSizes.small}>{rentGroupSummary.name}</ThemedText>
                        <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                            {rentGroupSummary.tenants.map((tenant, i) => (
                                <ThemedText numberOfLines={2} variant="bold" size={8} key={tenant.id} style={{color: '#888'}}>
                                    {`${tenant.name}, `}
                                </ThemedText>
                            ))}
                        </View>
                    </View>
                    <View>
                        <ThemedText size={10}>{`${formatUSD((rentGroupSummary.paymentPlan?.amountCents / 100) || 0)}/${shortenFrequency(rentGroupSummary.paymentPlan.frequency)}`}</ThemedText>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}