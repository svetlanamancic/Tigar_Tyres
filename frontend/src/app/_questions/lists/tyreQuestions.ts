import { DropdownQuestion } from "../dropdownQuestion";
import { QuestionBase } from "../questionBase";
import { TextboxQuestion } from "../textboxQuestion";

export const TyreQuestions: QuestionBase<string>[] = [
    new TextboxQuestion({
        key: 'code',
        label: 'Code',
        type: 'text',
        required: true,
        order: 1
    }),
    new DropdownQuestion({
        key: 'type',
        label: 'Type',
        required: true,
        options: [
            {key: 'bus', value: 'Bus'},
            {key: 'car', value: 'Car'},
            {key: 'motocycle', value: 'Motocycle'},
            {key: 'truck', value: 'Truck'}
        ],
        order: 2
    }),
    new TextboxQuestion({
        key: 'price',
        label: 'Price',
        type: 'number',
        min: 1,
        required: true,
        order: 3
    })
];
