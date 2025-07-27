
import CreateTenantRequest from "@/types/CreateTenantRequest";
import TenantListItemData from "@/types/TenantListItemData";
import { TenantWithPaymentPlan } from "@/types/TenantWithPaymentPlan";
import api from "./api";

const TenantService = {
    getListItems: async (userId: string): Promise<TenantListItemData[]> => {
        let response = await api.get<TenantListItemData[]>('/tenants/list', {
            params: {
                userId: userId
            }
        });

        return response.data;
    },
    createTenantWithPaymentPlan: async (request: CreateTenantRequest) => {
        let response = await api.post<TenantWithPaymentPlan>('/tenant', request);
        return response.data;
    }
}

export default TenantService;