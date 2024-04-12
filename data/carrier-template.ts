import {Carriers} from "../enum";

export interface ICarrierTemplate {
    baseUrl: string,
    isPaginated: boolean,
    pagePath: string,
    agent: {
        root: ITemplateElement,
        name: ITemplateElement,
        producerCode: ITemplateElement,
        agencyName: ITemplateElement,
        agencyCode: ITemplateElement
    },
    customer: {
        root: ITemplateElement,
        name: ITemplateElement,
        id: ITemplateElement,
        email: ITemplateElement,
        address: ITemplateElement
    },
    policies: {
        root: ITemplateElement,
        item: ITemplateElement,
        id: ITemplateElement,
        premium: ITemplateElement,
        status: ITemplateElement,
        effectiveDate: ITemplateElement,
        terminationDate: ITemplateElement,
        lastPaymentDate: ITemplateElement
    }
}

export interface ITemplateElement {
    element: string,
    select: string,
    id?: string,

}
export const CarrierTemplate = {
    [Carriers.MOCK_INDEMNITY]: {
        baseUrl: 'https://scraping-interview.onrender.com/mock_indemnity/',
        isPaginated: false,
        pagePath: '',
        agent: {
            root: {element: 'div', select: '.agent-detail'},
            name: {element: 'dd', select:'.value-name'},
            producerCode: {element: 'dd', select:'.value-producerCode'},
            agencyName: {element: 'dd', select:'.value-agencyName'},
            agencyCode: {element: 'dd', select:'.value-agencyCode'}
        },
        customer: {
            root: {element: 'div', select:'.customer-detail'},
            name: {element: 'dd', select:'.value-name'},
            id: {element:'dd', select:'.value-id'},
            email: {element:'dd', select:'.value-email'},
            address: {element:'dd', select:'.value-address'}
        },
        policies: {
            root: {element: 'ul',  select:'.policy-ul'},
            item: {element: 'li', select:'.list-group-item'},
            id: {element: 'li', select:'.id'},
            premium: {element: 'li', select:'.premium'},
            status:{element: 'li', select:'.status'},
            effectiveDate: {element: 'li', select:'.effectiveDate'},
            terminationDate:{element: 'li', select: '.terminationDate'},
            lastPaymentDate: {element: 'li', select:'.lastPaymentDate'}
        }
    },
    [Carriers.PLACEHOLDER_CARRIER]: {
        baseUrl: 'https://scraping-interview.onrender.com/placeholder_carrier/',
        isPaginated: true,
        pagePath: '/policies/',
        agent: {
            root: {element: 'div', select: '.agency-details'},
            name: {element: 'span', select:'[for=name]+'},
            producerCode: {element: 'span', select:'[for=producerCode]+'},
            agencyName: {element: 'span', select:'[for=agencyName]+'},
            agencyCode: {element: 'span', select:'[for=agencyCode]+'}
        },
        customer: {
            root: {element: 'div', select:'.customer-details'},
            name: {element: 'span', select:'[for=name]+'},
            id: {element:'span', select:'label:contains("Id")+'},
            email: {element:'span', select:'label:contains("Email")+'},
            address: {element:'span', select:'label:contains("Address")+'}
        },
        policies: {
            root: {element: 'div', select:'.policy-details > table > tbody'},
            item: {element: 'tr', select:'tr:not(.collapse) '},
            id: {element: 'td', select:':nth-child(1)'},
            premium: {element: 'td', select:':nth-child(2)'},
            status:{element: 'td', select:':nth-child(3)'},
            effectiveDate: {element: 'td', select:':nth-child(4)'},
            terminationDate:{element: 'td', select: ':nth-child(5)'},
            lastPaymentDate: {element: 'td', select:'+'}
        }
    }
}
