import PaymentPlan from "./PaymentPlan";
import Tenant from "./Tenant";

type RentGroupSummary = {
    id: string,
    name: string,
    active: boolean,
    createdAt: string,
    tenants: Tenant[],
    paymentPlan: PaymentPlan
}

export default RentGroupSummary;