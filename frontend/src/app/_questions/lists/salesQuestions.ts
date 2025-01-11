
import { DropdownQuestion } from "../dropdownQuestion";
import { QuestionBase } from "../questionBase";
import { TextboxQuestion } from "../textboxQuestion";

export class SalesQuestions {

    static questions: QuestionBase<string>[] = [
        new TextboxQuestion({
            key: 'destinationMarket',
            label: 'Destination market',
            type: 'text',
            required: true,
            order: 1
        }),
        new TextboxQuestion({
            key: 'purchasingCompany',
            label: 'Purchasing company',
            type: 'text',
            required: true,
            order: 2
        })
    ];

    constructor() {}

    public static getQuestions(productionService, id=null) {

        let productionOptions = [];

        productionService.getRaw().subscribe({
            next: (res) => {
                for (let i in res) {
                    if(res[i].sale == null || (id != null && res[i].sale == id)) {
                        productionOptions.push( {
                            'key':res[i].id,
                            'value':"Tyre code: "+res[i].tyre+", Quantity: "+res[i].quantity
                        });
                    }
                    
                }
            },
            error: (err) => console.log(err)
        });

        if(this.questions.find(x=>x.key=='production') == null) {

            this.questions.push(new DropdownQuestion({
                key: 'production',
                label: 'Production',
                required: true,
                options: productionOptions,
                order: 3
            }));
        }
        else {
            this.questions.find(x => x.key=='production').options = productionOptions;
        }

        return this.questions;
    }


}