import NewRentGroupModal from "@/components/NewRentGroupModal";
import NewTenantModal from "@/components/NewTenantModal";
import RentGroupListItem from "@/components/RentGroupListItem";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import RentGroupService from "@/services/RentGroupService";
import PaginatedResponse from "@/types/PaginatedResponse";
import RentGroupSummary from "@/types/RentGroupSummary";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MenuView } from "@react-native-menu/menu";
import { useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tenants() {
    const theme = useAppTheme();
    const [rentGroups, setRentGroups] = useState<PaginatedResponse<RentGroupSummary>>();
    const [searchOpen, setSearchOpen] = useState(false);
    const searchWidth = useSharedValue(theme.spacing.lg);
    const [groupModalOpen, setGroupModalOpen] = useState<boolean>(false);
    const [tenantModalOpen, setTenantModalOpen] = useState<boolean>(false);

    useEffect(() => {
        loadRentGroups();
    }, []);

    const loadRentGroups = async () => {
        try {
            const data = await RentGroupService.listRentGroupsByUser(
                "69d5799e-2000-4d27-8465-0b8aad0b9311"
            );
            setRentGroups(data);
        } catch (e) {
            console.error("Failed to load rent groups", e);
        }
    };

    const animatedSearchStyle = useAnimatedStyle(() => ({
        width: withTiming(searchWidth.value, { duration: 300 }),
    }));

    const handleOpenSearch = () => {
        setSearchOpen(true);
        searchWidth.value = 250;
    };

    const handleCloseSearch = () => {
        setSearchOpen(false);
        searchWidth.value = theme.spacing.lg;
    };

    const styles = StyleSheet.create({
        root: {
        flex: 1,
        },
        header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: theme.gutterPadding,
        paddingVertical: theme.spacing.xs,
        },
    });

    return (
        <SafeAreaView edges={["top"]} style={styles.root}>
            <View style={styles.header}>
                <Animated.View
                style={[
                    {
                    height: theme.spacing.lg,
                    borderRadius: theme.spacing.lg / 2,
                    backgroundColor: "rgba(255, 122, 83, 0.7)",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'center',
            
                    },
                    animatedSearchStyle,
                ]}
                >
                {!searchOpen ? (
                    <Pressable
                    onPress={handleOpenSearch}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: theme.spacing.lg,
                        height: theme.spacing.lg,
                    }}
                    >
                    <MaterialIcons
                        name="search"
                        size={theme.spacing.md}
                        color={theme.colors.text}
                    />
                    </Pressable>
                ) : (
                    <TextInput
                    autoFocus
                    placeholder="Search tenants..."
                    placeholderTextColor={theme.colors.text}
                    style={{
                        flex: 1,
                        color: theme.colors.text,
                        fontFamily: theme.fonts.regular.fontFamily,
                        fontSize: 14,
                        padding: 0,
                        marginLeft: theme.spacing.xs,
                    }}
                    />
                )}
                </Animated.View>

                {!searchOpen ? (
                <View
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: theme.spacing.xs,
                    }}
                >
                    <MenuView
                    title=""
                    onPressAction={({nativeEvent}) => {
                        console.log('event', nativeEvent.event)
                        if (nativeEvent.event === 'tenant') setTenantModalOpen(true);
                        else setGroupModalOpen(true);
                    }}
                    actions={[
                        {
                            id: 'tenant',
                            title: 'Create Tenant'
                        },
                        {
                            id: 'group',
                            title: 'Create Group'
                        }
                    ]}>

                        <View
                        style={{
                            height: theme.spacing.lg,
                            width: theme.spacing.lg,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: theme.spacing.lg / 2,
                            backgroundColor: "rgba(255, 122, 83, 0.7)",
                        }}
                        >
                        <MaterialIcons
                            name="add"
                            size={theme.spacing.md}
                            color={theme.colors.text}
                        />
                        </View>
                    </MenuView>
                </View>
                ) : (
                <Pressable onPress={handleCloseSearch}>
                    <ThemedText style={{ color: theme.colors.primary }}>
                    Cancel
                    </ThemedText>
                </Pressable>
                )}
            </View>

            <FlatList
                data={rentGroups?.content}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <RentGroupListItem rentGroupSummary={item} />
                )}
                style={{ flex: 1 }}
            />
            <NewTenantModal visible={tenantModalOpen} close={()=>setTenantModalOpen(false)} onCreateTenant={()=>{}}/>
            <NewRentGroupModal visible={groupModalOpen} close={()=>setGroupModalOpen(false)} onCreateGroup={()=>{}}/>
        </SafeAreaView>
    );
}
