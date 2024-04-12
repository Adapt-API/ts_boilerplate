/**
 * Data
 */
import * as InputFile from './input.json'
/**
 * Class
 */
import {BaseScraper} from "./scraper";
/**
 * Enum
 */
import {Carriers} from "./enum";
/**
 * Interface
 */
import {CarrierParser} from "./scraper/carrier-parser";


async function scrape() {
    const input = InputFile.input;
    const scraper: BaseScraper = new BaseScraper();

    for (let i of input) {

        console.log('scraping:', i);
        scraper.setCarrier(i.carrier as Carriers);
        const body: string = await scraper.loadBody(i.customerId);
        const parser: CarrierParser = new CarrierParser(body, i.carrier as Carriers);
        try {
            const data = await  parser.getData();
            console.log(data);
        }
        catch(e) {
            console.log(e);
        }

    }

}

scrape()