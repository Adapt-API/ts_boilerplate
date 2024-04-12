// Packages
import cheerio from "cheerio";
import axios from "axios";
// Data
import {CarrierTemplate} from "../data";
// Interface
import {ICarrierTemplate} from "../interface";
// Enum
import {Carriers} from "../enum";

/**
 * The CarrierPageLoader class is used load page bodies for a given Carrier.
 */
export class CarrierPageLoader {

    public pages: Array<string | null> = [];
    public template: ICarrierTemplate | undefined;

    /**
     * This method initializes the CarrierPageLoader instance with an empty array of pages
     * and the configuration template for the provided Carrier.
     * @param carrier
     */
    public initializeCarrier(carrier: Carriers) {
        this.pages = [];
        this.template = CarrierTemplate[carrier];
    }

    /**
     * Method to begin loading pages
     * @param id
     */
    public async load(id: string): Promise<void> {
        if (!this.template) {
            throw new Error(`${CarrierPageLoader.name} carrier template is undefined.`)
        }
        // Construct the initial page url using the carrier template configuration
        let url: string = (this.template.baseUrl+this.template.carrierUrl).replace(':id', id);

        // Load all pages for the current carrier
        await this.loadBodyPages(id, url);
    }

    /**
     * This method will load the body of the page at the specified url.
     * It will also recursively attempt to find and load the next page url
     * @param id
     * @param url
     */
    private async loadBodyPages(id: string, url: string): Promise<void> {
        if (!this.template) {
            throw new Error(`${CarrierPageLoader.name} carrier template is undefined.`)
        }

        // Load the page from the provided url;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        // Get the body of the page
        const body = $('body').html() || '';
        // Save the body to the pages array
        this.pages.push(body);
        /**
         * If the carrier's template specifies that the data is paginated,
         * then we want to attempt to select the href attribute from the page
         * navigation element. If we find an href, then we will recursively call
         * this method and continue the load/navigate loop, saving each page we encounter.
         */
        if (this.template.isPaginated && this.template.page) {
            // Attempt to parse out the next url from the current page
            const nextPageUrl = $(this.template.page.select).attr('href');
            console.log('next page url:', nextPageUrl)

            if (nextPageUrl) {
                await this.loadBodyPages(id,this.template.baseUrl+nextPageUrl);
            }
        }
    }

}