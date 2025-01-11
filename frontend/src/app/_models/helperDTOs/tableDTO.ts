export class TableDTO {
    headers: any;
    data: any;

    constructor(tableHeaders=[], tableData=[]) {
        this.headers = tableHeaders;
        this.data = tableData;
    }
}