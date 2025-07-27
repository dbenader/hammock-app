type CreateTenantRequest = {
    name: string;
    email: string;
    amountCents: number;
    dueDate: string; // ISO string
    frequency: 'ONE_TIME' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
    userId: string;
}

export default CreateTenantRequest;