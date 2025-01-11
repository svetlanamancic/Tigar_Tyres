import { DropdownQuestion } from "../dropdownQuestion";
import { QuestionBase } from "../questionBase";
import { TextboxQuestion } from "../textboxQuestion";

export const MachineQuestions: QuestionBase<string>[] = [
    new TextboxQuestion({
        key: 'name',
        label: 'Machine name',
        type: 'text',
        required: true,
        order: 1,
    }),
    new DropdownQuestion({
        key: 'location',
        label: 'Location',
        required: true,
        options: [
            {key: 'TC1', value: 'TC1'},
            {key: 'TC2', value: 'TC2'},
            {key: '2T', value: '2T'},
        ],
        order: 2,
    })
];
