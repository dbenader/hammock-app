import PaginatedResponse from "@/types/PaginatedResponse";
import RentGroupSummary from "@/types/RentGroupSummary";
import api from "./api";

const RentGroupService = {
    listRentGroupsByUser: async (userId: string) => {
        let response = await api.get<PaginatedResponse<RentGroupSummary>>('/rent-groups/summary', {
            params: {
                userId: userId
            }
        });
        return response.data;
    }
}

export default RentGroupService;