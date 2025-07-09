import RentGroupListItem from "@/components/RentGroupListItem";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import RentGroupService from "@/services/RentGroupService";
import PaginatedResponse from "@/types/PaginatedResponse";
import RentGroupSummary from "@/types/RentGroupSummary";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tenants() {
    let [rentGroups, setRentGroups] = useState<PaginatedResponse<RentGroupSummary>>();
    const USER_ID = '69d5799e-2000-4d27-8465-0b8aad0b9311';


    useEffect(() => {
        loadRentGroups();
    }, [])

    const loadRentGroups = async () => {
        try {
            const data = await RentGroupService.listRentGroupsByUser(USER_ID);
            setRentGroups(data);
            console.log('data', data)
        } catch (e) {
            console.error("Failed to load rent groups", e);
        }
    }

    const theme = useAppTheme();
    const styles = StyleSheet.create({
        root: {
            flex: 1
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme.gutterPadding,
            paddingVertical: theme.spacing.xs
        }
    })
    return (
        <SafeAreaView edges={["top"]} style={styles.root}>
            <View style={styles.header}>
                <View style={{height: theme.spacing.lg, width: theme.spacing.lg, justifyContent: 'center', alignItems: 'center', borderRadius: theme.spacing.lg/2, backgroundColor: 'rgba(255, 122, 83, 0.3)'}}>
                    <MaterialIcons name="search" size={theme.spacing.md} color={theme.colors.text} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                        <MaterialIcons name="people-alt" size={18} color={theme.colors.text} />
                        <ThemedText>14</ThemedText>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                        <FontAwesome5 name="house-user" size={16} color={theme.colors.text} />
                        <ThemedText>{rentGroups?.totalElements}</ThemedText>
                    </View>
                    <View style={{height: theme.spacing.lg, width: theme.spacing.lg, justifyContent: 'center', alignItems: 'center', borderRadius: theme.spacing.lg/2, backgroundColor: 'rgba(255, 122, 83, 0.3)'}}>
                        <MaterialIcons name="add" size={theme.spacing.md} color={theme.colors.text} />
                    </View>
                </View>
            </View>
            <FlatList
            data={rentGroups?.content}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <RentGroupListItem rentGroupSummary={item}/>}
            style={{flex: 1}}/>
        </SafeAreaView>
    )
}