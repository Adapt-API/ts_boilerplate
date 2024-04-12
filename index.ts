/**
 * Data
 */
import * as InputFile from './input.json'
/**
 * Class
 */
import { CarrierPageLoader, CarrierPageParser } from "./scraper";
/**
 * Enum
 */
import {Carriers} from "./enum";
/**
 * Interface
 */
import {IParsedPage, ScraperInput, ScraperOutput} from "./interface";


/**
 * Scraping function to orchestrate loading, parsing, and data formatting
 */
async function scrape(): Promise<void> {
    const input: ScraperInput[] = InputFile.input;
    const loader: CarrierPageLoader = new CarrierPageLoader();
    const out: ScraperOutput[] = [];
    for (let i of input) {

        loader.initializeCarrier(i.carrier as Carriers);
        await loader.load(i.customerId);

        const parsedPages: IParsedPage[] = await parsePages(loader.pages, i);

        out.push({
            carrier: i.carrier,
            customerId: i.customerId,
            parsedPages: parsedPages
        });
    }

    console.log(JSON.stringify(out, null, 4));
}

/**
 * Parsing function to extract normalized field data from the provided pages
 * @param pages An array of page bodies
 * @param input Carrier input object
 */
async function parsePages(pages: Array<string | null>, input: ScraperInput): Promise<IParsedPage[]> {
    let result: IParsedPage[] = [];
    const parser: CarrierPageParser = new CarrierPageParser();
    for (const page of pages) {
        if (!page) continue;
        parser.initializeCarrierPage(page, input.carrier as Carriers);
        try {
            const data: IParsedPage = await  parser.getData();
            result.push(data);
        }
        catch(e) {
            console.log(e);
        }
    }

    return result;
}

scrape();