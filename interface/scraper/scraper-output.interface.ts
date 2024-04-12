import {ScraperInput} from "./scraper-input.interface";
import {IParsedPage} from "./parsed-page.interface";

export interface ScraperOutput extends ScraperInput {
    parsedPages: IParsedPage[];
}