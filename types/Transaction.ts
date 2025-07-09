type Transaction = {
    id: string;
    userId: string;
    rentGroupId: string;
    tenantId: string;
    tenantName: string;
    email: string;
    amountCents: number;
    stripePaymentIntentId: string;
    status: string;
    receivedAt: string;  // ISO timestamp
    createdAt: string;   // ISO timestamp
}

export default Transaction;