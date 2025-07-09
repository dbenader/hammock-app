import PaymentRule from "./PaymentRule";
import Tenant from "./Tenant";

type RentGroupSummary = {
    id: string,
    name: string,
    active: boolean,
    createdAt: string,
    tenants: Tenant[],
    paymentRule: PaymentRule
}

export default RentGroupSummary;