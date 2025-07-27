import PaymentPlan from "./PaymentPlan";


export type TenantWithPaymentPlan = {
  id: string; // UUID
  userId: string; // UUID
  name: string;
  email: string;
  createdAt: string; // ISO 8601 timestamp
  paymentPlan: PaymentPlan;
};