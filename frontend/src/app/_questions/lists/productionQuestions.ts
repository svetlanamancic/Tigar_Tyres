import { DropdownQuestion } from "../dropdownQuestion";
import { QuestionBase } from "../questionBase";
import { TextboxQuestion } from "../textboxQuestion";

export class ProductionQuestions {

    static questions: QuestionBase<string>[] = [
        new TextboxQuestion({
            key: 'quantity',
            label: 'Quantity',
            type: 'number',
            min: 1,
            required: true,
            order: 1
        }),
        new DropdownQuestion({
            key: 'shift',
            label: 'Shift',
            required: true,
            options: [
            {key: '1', value: '1'},
            {key: '2', value: '2'},
            {key: '3', value: '3'}
            ],
            order: 2
        })
    ];

    constructor() {}

    public static getQuestions(machineService, tyreService) {

        //append new dropdown questions to questions array and return array
        if(this.questions.find(x=>x.key=='machine') == null) {
            let machineOptions = [];

            machineService.getRaw().subscribe({
                next: (res) => {
                    for(let i in res){
                        machineOptions.push({'key':res[i].name, 'value': res[i].name});
                    }
                },
                error: (err) => console.log(err)
            });

            this.questions.push(new DropdownQuestion({
                key: 'machine',
                label: 'Machine',
                required: true,
                options: machineOptions,
                order: 3
            }));
        }

        if(this.questions.find(x=>x.key=='tyre') == null) {
            let tyreOptions = [];
            
            //get options from API and parse into dropdown options
            tyreService.getRaw().subscribe({
                next: (res) => {
                    for(let i in res){
                        tyreOptions.push({'key':res[i].code, 'value': res[i].code});
                    }
                },
                error: (err) => console.log(err)
            });

            this.questions.push(new DropdownQuestion({
                key: 'tyre',
                label: 'Tyre',
                required: true,
                options: tyreOptions,
                order: 4
            }));
        }

        return this.questions;
    }


}
    