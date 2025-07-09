import PaginatedResponse from "@/types/PaginatedResponse";
import Transaction from "@/types/Transaction";
import api from "./api";

const TransactionService = {
    listTransactions: async (period: 'weekly' | 'monthly' | 'yearly' | 'all time', userId: string) => {
        const res = await api.get<PaginatedResponse<Transaction>>(`/transactions`, {
                params: {
                    userId: userId,
                    period: period, // 'monthly', 'weekly', etc. — optional for now
                    page: 0,
                    size: 20
                }
        });

        return res.data;
    }
}

export default TransactionService;