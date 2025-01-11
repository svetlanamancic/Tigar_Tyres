import { DateQuestion } from "../dateQuestion";
import { DropdownQuestion } from "../dropdownQuestion";
import { QuestionBase } from "../questionBase";
import { TextboxQuestion } from "../textboxQuestion";

export class FilterQuestions {
    static questions: QuestionBase<string>[] = [
        new DropdownQuestion({
            key: 'shift',
            label: 'Shift',
            required: false,
            options: [
            {key: '1', value: '1'},
            {key: '2', value: '2'},
            {key: '3', value: '3'}
            ],
            order: 1
        }),
        new DateQuestion({
            key: 'date',
            label: 'Date',
            required: false,
            order: 4
        })
    ];

    constructor() {}

    public static getQuestions(machineService, userService) {

        //add machines to dropdown
        if(this.questions.find(x => x.key=='machine') == null) {
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
                required: false,
                options: machineOptions,
                order: 2
            }));
        }

        //add operators to dropdown
        if(this.questions.find(x => x.key == 'operator') == null) {
            let userOptions = [];

            userService.getRaw().subscribe({
                next: (res) => {
                    for(let i in res) {
                        userOptions.push({'key':res[i].username, 'value': res[i].username});
                        
                    }
                },
                error: (err) => console.log(err)
                
            });

            this.questions.push(new DropdownQuestion({
                key: 'operator',
                label: 'Operator',
                required: false,
                options: userOptions,
                order: 3
            }));
        }

        return this.questions;
    }
}