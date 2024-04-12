import {Carriers} from "../enum";
import {ICarrierTemplate} from "../interface";

/**
 * CarrierTemplate contains the information necessary for the following:
 *
 * 1. CarrierPageLoader to load each page of carrier data
 * 2. CarrierPageParser to select the elements which contain data for each field.
 *
 */
export const CarrierTemplate: {MOCK_INDEMNITY: ICarrierTemplate, PLACEHOLDER_CARRIER: ICarrierTemplate} = {
    [Carriers.MOCK_INDEMNITY]: {
        baseUrl: 'https://scraping-interview.onrender.com',
        carrierUrl:'/mock_indemnity/:id',
        isPaginated: false,
        agent: {
            root: {element: 'div', select: '.agent-detail'},
            dataFields: {
                name: {element: 'dd', select:'.value-name'},
                producerCode: {element: 'dd', select:'.value-producerCode'},
                agencyName: {element: 'dd', select:'.value-agencyName'},
                agencyCode: {element: 'dd', select:'.value-agencyCode'}
            }
        },
        customer: {
            root: {element: 'div', select:'.customer-detail'},
            dataFields: {
                name: {element: 'dd', select:'.value-name'},
                id: {element:'dd', select:'.value-id'},
                email: {element:'dd', select:'.value-email'},
                address: {element:'dd', select:'.value-address'}
            }
        },
        policies: {
            root: {element: 'ul',  select:'.policy-ul'},
            item: {element: 'li', select:'.list-group-item'},
            dataFields: {
                id: {element: 'li', select:'.id'},
                premium: {element: 'li', select:'.premium'},
                status:{element: 'li', select:'.status'},
                effectiveDate: {element: 'li', select:'.effectiveDate'},
                terminationDate:{element: 'li', select: '.terminationDate'},
                lastPaymentDate: {element: 'li', select:'.lastPaymentDate'}
            }
        }
    },
    [Carriers.PLACEHOLDER_CARRIER]: {
        baseUrl: 'https://scraping-interview.onrender.com',
        carrierUrl: '/placeholder_carrier/:id/policies/1',
        isPaginated: true,
        page: {element:'a', select:'a:contains("Next")'},
        agent: {
            root: {element: 'div', select: '.agency-details'},
            dataFields: {
                name: {element: 'span', select: '[for=name]+'},
                producerCode: {element: 'span', select: '[for=producerCode]+'},
                agencyName: {element: 'span', select: '[for=agencyName]+'},
                agencyCode: {element: 'span', select: '[for=agencyCode]+'}
            }
        },
        customer: {
            root: {element: 'div', select:'.customer-details'},
            dataFields: {
                name: {element: 'span', select: '[for=name]+'},
                id: {element: 'span', select: 'label:contains("Id")+'},
                email: {element: 'span', select: 'label:contains("Email")+'},
                address: {element: 'span', select: 'label:contains("Address")+'}
            }
        },
        policies: {
            root: {element: 'div', select:'.policy-details > table > tbody'},
            item: {element: 'tr', select:'tr:not(.collapse) '},
            dataFields: {
                id: {element: 'td', select: ':nth-child(1)'},
                premium: {element: 'td', select: ':nth-child(2)'},
                status: {element: 'td', select: ':nth-child(3)'},
                effectiveDate: {element: 'td', select: ':nth-child(4)'},
                terminationDate: {element: 'td', select: ':nth-child(5)'},
                lastPaymentDate: {element: 'td', select: '+'}
            }
        }
    }
}
