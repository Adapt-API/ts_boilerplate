
export interface IParsedField {
    fieldName: string,
    value: string | null
}

export interface IParsedPage {
    agent: IParsedField[],
    customer: IParsedField[],
    policies: IParsedField[][]
}
