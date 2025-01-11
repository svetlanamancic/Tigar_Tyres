import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionBase } from '../../../_questions/questionBase';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionControlService } from '../../../_services/helpers/question-control.service';
import { CommonModule } from '@angular/common';
import { FormQuestionComponent } from '../form-question/form-question.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormQuestionComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  @Input() values;
  @Input() edit = false;
  @Output() payloadReady: EventEmitter<any> = new EventEmitter();


  constructor(private questionControlService: QuestionControlService) {}
 
  ngOnInit() {
    this.form = this.questionControlService
      .toFormGroup(this.questions as QuestionBase<string>[], this.edit, this.values);
  }

  onSubmit() {

    if(this.form.valid) {
      let payloadRaw = this.form.getRawValue()

      if(this.edit && (this.values.id != null || this.values.id != undefined)) {
        payloadRaw.id = this.values.id; //add id for update
      }

      this.payLoad = JSON.stringify(payloadRaw);
    }
    this.payloadReady.emit(this.payLoad);
  }


 

  
}
