import PaymentRule from "./PaymentRule";

export type TenantWithPaymentRule = {
  id: string; // UUID
  userId: string; // UUID
  name: string;
  email: string;
  createdAt: string; // ISO 8601 timestamp
  paymentRule: PaymentRule;
};