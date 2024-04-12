import cheerio from "cheerio";

import {IAgent, ICustomer, IPolicy, IScraperData} from "../interface";
import {BaseScraper} from "./base-scraper";
import {Carriers} from "../enum";
import {CarrierTemplate, ICarrierTemplate} from "../data";

require('dotenv').config();

export class CarrierParser {

    public body: string;
    public template: ICarrierTemplate;
    public constructor(body: string, carrier: Carriers) {
        this.body = body;
        this.template = CarrierTemplate[carrier];
    }

    public async getData(): Promise<IScraperData> {

        const agent: IAgent = await this.getAgentData();
        const customer: ICustomer = await this.getCustomerData();
        const policies: IPolicy[] = await this.getPolicyData();

        return {
            agent, customer, policies
        } as IScraperData;
    }

    public async getAgentData(): Promise<IAgent> {
        if (this.body === null) {
            throw new Error(` ${CarrierParser.name} has not loaded HTML body for ${this.template.baseUrl}`);
        }

        const $: cheerio.Root = cheerio.load(this.body);
        const template = this.template.agent;
        const agentRoot = $(this.template.agent.root.select);

        const agent: IAgent = {
            name: agentRoot.find(template.name.select).html() || '',
            producerCode: agentRoot.find(template.producerCode.select).html() || '',
            agencyName: agentRoot.find(template.agencyName.select).html() || '',
            agencyCode: agentRoot.find(template.agencyCode.select).html() || ''
        }

        return agent;
    }

    public async getCustomerData(): Promise<ICustomer> {
        if (this.body === null) {
            throw new Error(`${CarrierParser.name} has not loaded HTML body for ${this.template.baseUrl}`);
        }

        const $: cheerio.Root = cheerio.load(this.body);
        const template = this.template.customer;
        const customerRoot = $(template.root.select);

        const customer: ICustomer = {
            name: customerRoot.find(template.name.select).html() || '',
            id: customerRoot.find(template.id.select).html() || '',
            email: customerRoot.find(template.email.select).html() || '',
            address: customerRoot.find(template.address.select).html() || ''
        }

        return customer;
    }

    public async getPolicyData(): Promise<IPolicy[]> {
        if (this.body === null) {
            throw new Error(`${CarrierParser.name} has not loaded HTML body for ${this.template.baseUrl}`);
        }

        const $: cheerio.Root = cheerio.load(this.body);
        const template = this.template.policies;

        const policyList = $(template.root.select).children(template.item.select).toArray();
        //console.log('policy list', policyList)
        const policies: IPolicy[] = [];
        for (let policyItem of policyList) {
            console.log($('*',policyItem).html())

            const effectiveDateStr = $(template.effectiveDate.select, policyItem).html();
            const lastPaymentDateStr = $(template.lastPaymentDate.select, policyItem).html();
            console.log(lastPaymentDateStr)
            const terminationDateStr = $(template.terminationDate.select, policyItem).html() || '';


            const policy = {
                effectiveDate: effectiveDateStr ? new Date(effectiveDateStr) : null,
                lastPaymentDate: lastPaymentDateStr ? new Date(lastPaymentDateStr) : null,
                terminationDate:  terminationDateStr ? new Date(terminationDateStr) : null,
                premium: Number($(template.premium.select, policyItem).html()),
                status: $(template.status.select, policyItem).html(),
                id: $(template.id.select, policyItem).html()
            }

            policies.push(policy as IPolicy);
        }

        return policies;

    }
}