import RentGroup from "@/types/RentGroup";
import api from "./api";

const RentGroupService = {
    listRentGroupsByUser: async (userId: string) => {
        let response = await api.get<Array<RentGroup>>('/rent-groups', {
            params: {
                userId: userId
            }
        });
        return response.data;
    },

}

export default RentGroupService;