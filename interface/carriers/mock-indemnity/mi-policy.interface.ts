import {IPolicy} from "../../index";

export interface IMIPolicy extends IPolicy {
    lastPaymentDate?: Date | null
}