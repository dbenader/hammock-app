
import TenantListItemData from "@/types/TenantListItemData";
import api from "./api";

const TenantService = {
    getListItems: async (userId: string): Promise<TenantListItemData[]> => {
        let response = await api.get<TenantListItemData[]>('/tenants/list', {
            params: {
                userId: userId
            }
        });

        return response.data;
    }
}

export default TenantService;