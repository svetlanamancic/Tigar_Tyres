export class EmitPayload {
    model: any;
    editFlag: boolean;

    constructor(model, flag) {
        this.model = model;
        this.editFlag = flag;
    }
}