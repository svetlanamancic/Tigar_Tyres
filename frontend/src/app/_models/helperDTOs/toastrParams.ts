export class ToastrDTO {
    message: string;
    type: string;
    title: string;
    toastrClass: string;

    constructor(toastClass, toastMsg="", toastType="", toastTitle="") {
        this.message = toastMsg;
        this.type = toastType;
        this.title = toastTitle;
        this.toastrClass = toastClass;
    }
}