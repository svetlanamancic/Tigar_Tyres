import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from '../../../_questions/questionBase';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-form-question',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    BsDatepickerModule
  ],
  templateUrl: './form-question.component.html',
  styleUrl: './form-question.component.css'
})
export class FormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;

  bsConfig: Partial<BsDatepickerConfig>;
  maxDate: Date = new Date();

  constructor()
  {
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD MM YYYY',
      displayMonths: 1
    }
  }

  //check if this works in all use cases
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

}
