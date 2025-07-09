type PaymentRule = {
    id: string;
  rentGroupId: string;
  amountCents: number;
  dueDay: number;
  frequency: 'MONTHLY' | 'WEEKLY';
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export default PaymentRule;