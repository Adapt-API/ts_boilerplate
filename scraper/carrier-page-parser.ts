// Packages
import cheerio from "cheerio";
// Data
import {
    CarrierTemplate
} from "../data";
// Interface
import {
    CarrierTemplateListKey,
    CarrierTemplateSectionKey,
    ICarrierTemplate,
    IParsedField
} from '../interface'
// Enum
import {Carriers} from "../enum";

/**
 * The CarrierPageParser class is capable of parsing data fields specified in the CarrierTemplate configuration.
 * The purpose of the CarrierPageParser is to extract values from an HTML page in as normalized
 * of a format as possible.
 *
 * Each individual data point is formatted as an IParsedField object.
 * Additional data type casting and massaging is performed by the CarrierDataFormatter
 */
export class CarrierPageParser {

    public body: string | undefined;
    public template: ICarrierTemplate | undefined;

    /**
     * The CarrierPageParser class must be provided with an html body to parse
     * Additionally, each carrier has its own template of field/selector values
     * @param body
     * @param carrier
     */
    public initializeCarrierPage(body: string, carrier: Carriers) {
        this.body = body;
        this.template = CarrierTemplate[carrier];
    }

    /**
     * Orchestrator method, gets data for all sections
     */
    public async getData(){

        const agent: IParsedField[] = await this.getSectionData('agent');
        const customer: IParsedField[] = await this.getSectionData('customer')
        const policies: IParsedField[][] = await this.getListData('policies');

        return {
            agent, customer, policies
        };
    }

    /**
     * Parse all field data for a flat object from a specified data section.
     * Example usage: Get data for all fields specified for 'agent' data
     * @param sectionName
     */
    public async getSectionData(sectionName: CarrierTemplateSectionKey): Promise<IParsedField[]> {
        if (!this.body) {
            throw new Error(` ${CarrierPageParser.name} is missing an HTML body.`);
        }

        if (!this.template) {
            throw new Error(` ${CarrierPageParser.name} is missing a carrier template.`);
        }

        const $: cheerio.Root = cheerio.load(this.body);
        const template = this.template[sectionName];
        const rootElement: cheerio.Cheerio = $(template.root.select);
        let result: IParsedField[] = []

        for (let [key, value] of Object.entries(template.dataFields)) {
            let element: IParsedField = {fieldName: key, value: rootElement.find(value.select).html()}
            result.push(element);
        }

        return result;
    }

    /**
     * Parse list of field data for objects from a specified data list section
     * @param listName
     */
    public async getListData(listName: CarrierTemplateListKey): Promise<IParsedField[][]> {
        if (!this.body) {
            throw new Error(` ${CarrierPageParser.name} is missing an HTML body.`);
        }

        if (!this.template) {
            throw new Error(` ${CarrierPageParser.name} is missing a carrier template.`);
        }

        const $: cheerio.Root = cheerio.load(this.body);
        const template = this.template[listName];
        const rootList: cheerio.Element[] = $(template.root.select).children(template.item.select).toArray();
        const result: IParsedField[][] = [];

        for (let itemElement of rootList) {
            let entry: IParsedField[] = []
            for (let [key, value] of Object.entries(template.dataFields)) {
                let element: IParsedField = {fieldName: key, value: $(value.select, itemElement).html()}
                entry.push(element);
            }

            result.push(entry);
        }

        return result;

    }
}