
export interface ICarrierTemplate {
    baseUrl: string,
    carrierUrl: string,
    isPaginated: boolean,
    page?: ITemplateElement,
    agent: {
        root: ITemplateElement,
        dataFields: {
            name: ITemplateElement,
            producerCode: ITemplateElement,
            agencyName: ITemplateElement,
            agencyCode: ITemplateElement
        }
    },
    customer: {
        root: ITemplateElement,
        dataFields: {
            name: ITemplateElement,
            id: ITemplateElement,
            email: ITemplateElement,
            address: ITemplateElement
        }
    },
    policies: {
        root: ITemplateElement,
        item: ITemplateElement,
        dataFields: {
            id: ITemplateElement,
            premium: ITemplateElement,
            status: ITemplateElement,
            effectiveDate: ITemplateElement,
            terminationDate: ITemplateElement,
            lastPaymentDate: ITemplateElement
        }
    }
}

export type CarrierTemplateSectionKey = 'agent' | 'customer';
export type CarrierTemplateListKey = 'policies';

export interface ITemplateElement {
    element: string,
    select: string,
    id?: string,
}