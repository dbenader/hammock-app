import RentGroupSummary from "./RentGroupSummary";
import { TenantWithPaymentRule } from "./TenantWithPaymentRule";

type TenantListItemData =
  | { type: 'TENANT'; tenant: TenantWithPaymentRule }
  | { type: 'GROUP'; group: RentGroupSummary };

export default TenantListItemData;