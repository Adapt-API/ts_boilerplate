
import {IPolicy} from "./policy.interface";
import {IAgent} from "./agent.interface";
import {ICustomer} from "./customer.interface";

export interface IScraperData {
    agent: IAgent,
    customer: ICustomer,
    policies: IPolicy[]
}