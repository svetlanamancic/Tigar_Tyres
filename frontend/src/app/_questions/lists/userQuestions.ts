import { DropdownQuestion } from "../dropdownQuestion";
import { QuestionBase } from "../questionBase";
import { TextboxQuestion } from "../textboxQuestion";

export const UserQuestions: QuestionBase<string>[] = [
    new TextboxQuestion({
        key: 'firstname',
        label: 'First name',
        type: 'text',
        required: true,
        order: 1
    }),
    new TextboxQuestion({
        key: 'lastname',
        label: 'Last name',
        type: 'text',
        required: true,
        order: 2
    }),
    new TextboxQuestion({
        key: 'username',
        label: 'Username',
        type: 'text',
        required: true,
        minlength: 5,
        order: 3
    }),
    new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        minlength: 8,
        order: 4
    }),
    new DropdownQuestion({
        key: 'role',
        label: 'Role',
        required: true,
        options: [
        {key: 'Admin', value: 'Admin'},
        {key: 'Production Operator', value: 'Production Operator'},
        {key: 'Quality Supervisor', value: 'Quality Supervisor'},
        {key: 'Business Unit Leader', value: 'Business Unit Leader'}
        ],
        order: 5
    })
];
