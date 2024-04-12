export interface IPolicy {
    id?: string,
    premium?: number,
    status?: string,
    effectiveDate?: Date | null,
    terminationDate?: Date | null
}