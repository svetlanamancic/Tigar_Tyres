export interface Sales {
    id: number;
    quantity: number;
    purchasingCompany: string;
    destinationMarket: string;
    tyre: string;
    supervisor: string;
    saleDate: string;
    production: number;
    modifiedFlag: boolean;
    modifier: string;
    dateModified: Date;
}