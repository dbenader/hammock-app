import RentGroupSummary from "./RentGroupSummary";
import { TenantWithPaymentPlan } from "./TenantWithPaymentPlan";


type TenantListItemData =
  | { type: 'TENANT'; tenant: TenantWithPaymentPlan }
  | { type: 'GROUP'; group: RentGroupSummary };

export default TenantListItemData;