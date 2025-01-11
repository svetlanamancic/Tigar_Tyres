export interface Production {
    id: number;
    quantity: number;
    shift: number;
    machine: string;
    tyre: string;
    operator: string;
    productionDate: string;
    modifiedFlag: boolean;
    modifier: string;
    dateModified: Date;
    sale: number;
}