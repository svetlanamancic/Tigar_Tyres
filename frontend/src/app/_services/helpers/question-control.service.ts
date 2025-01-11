import { Injectable } from '@angular/core';
import { QuestionBase } from '../../_questions/questionBase';
import { FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  toFormGroup(questions: QuestionBase<string>[], edit: boolean ,values?: any) {
    const group: any = {};

    questions.forEach((question) => {

      if( edit && (values != undefined || values != null )) {
        question.value = values[question.key];      
      }
      else {
        question.value = '';
      }

      let validators = [];

      if (question.required) validators.push(Validators.required);

      if (question.min) validators.push(Validators.min(question.min));

      if (question.minlength) validators.push(Validators.minLength(question.minlength));

      group[question.key] = new FormControl(question.value || '', validators);

    });

    return new FormGroup(group);
  }
}
