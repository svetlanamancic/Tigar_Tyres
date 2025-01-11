export class Modal {
    toggle: boolean;
    title: string;
    questions: string;
    model: any;
    edit: boolean; 

    constructor(toggle, title, questions, edit) {
        this.toggle = toggle;
        this.title = title;
        this.questions = questions;
        this.edit = edit;
    }
}