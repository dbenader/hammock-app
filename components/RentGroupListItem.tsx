import { useAppTheme } from "@/hooks/useAppTheme";
import RentGroup from "@/types/RentGroup";
import RentGroupSummary from "@/types/RentGroupSummary";
import { formatUSD, shortenFrequency } from "@/util/lib";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Avatars from "./Avatars";
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
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.borderRadius,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            justifyContent: 'center',
            height: 90
        }
    });


    const handleItemPress = (item: RentGroup) => {
        router.navigate(`/tenants/group/${item.id}`);
    };

    return (
        <Pressable onPress={()=>{}} style={({pressed}) => [styles.root, {backgroundColor: pressed ? 'rgba(255, 122, 83, 0.7)' : undefined, borderRadius: pressed ? theme.borderRadius : undefined}]}>
            <View style={{gap: theme.spacing.xs}}>
                {/* {rentGroupSummary.tenants.length > 0 && <Avatar group name="" size={theme.spacing.lg}/>} */}
                 <ThemedText variant="bold" size={theme.fontSizes.small}>{rentGroupSummary.name}</ThemedText>
                 <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    {rentGroupSummary.tenants.length > 0 && <Avatars names={rentGroupSummary.tenants.map(t => t.name)} size={theme.spacing.md}/>}
                    <ThemedText size={theme.fontSizes.xsmall}>{`${formatUSD(rentGroupSummary.paymentRule.amountCents / 100)}/${shortenFrequency(rentGroupSummary.paymentRule.frequency)}`}</ThemedText>
                 </View>
            </View>
        </Pressable>
    );
}