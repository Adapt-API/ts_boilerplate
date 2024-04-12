import cheerio from "cheerio";
import axios from "axios";
import {Carriers} from "../enum";
import {CarrierTemplate, ICarrierTemplate} from "../data";


export class BaseScraper {

    public body: string | null = null;

    public template: ICarrierTemplate | undefined;

    public constructor() {}

    public setCarrier(carrier: Carriers) {
        this.body = null;
        this.template = CarrierTemplate[carrier];
    }

    public async loadBody(id: string): Promise<string> {
        if (!this.template) {
            throw new Error(`${BaseScraper.name} carrier template is undefined.`)
        }
        let url: string = this.template.baseUrl + id;
        if (this.template.isPaginated) {
            url = url + this.template.pagePath + 1;
        }
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        this.body = $('body').html() || '';
        return this.body as string;
    }

}