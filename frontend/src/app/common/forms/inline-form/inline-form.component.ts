import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormQuestionComponent } from '../form-question/form-question.component';
import { QuestionBase } from '../../../_questions/questionBase';
import { QuestionControlService } from '../../../_services/helpers/question-control.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-inline-form',
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      FormQuestionComponent, 
      BsDatepickerModule
  ],
  templateUrl: './inline-form.component.html',
  styleUrl: './inline-form.component.css',
})
export class InlineFormComponent {
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payload: any = {};
  @Output() applyFilter: EventEmitter<any> = new EventEmitter();

  constructor (private questionControlService: QuestionControlService) {}

  ngOnInit() {
    this.form = this.questionControlService
      .toFormGroup(this.questions as QuestionBase<string>[], false, null);
  }

  submitFilter() {
    this.applyFilter.emit(this.form.getRawValue());
  }

  resetFilter() {
    this.form.reset();
    this.submitFilter();
  }
}
