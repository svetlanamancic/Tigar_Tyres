import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuestionService } from '../../_services/helpers/question.service';
import { Observable, map } from 'rxjs';
import { QuestionBase } from '../../_questions/questionBase';
import { FormComponent } from '../forms/form/form.component';
import { EmitPayload } from '../../_models/helperDTOs/emitPayload';
import { Modal } from '../../_models/helperDTOs/modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() modalDto: Modal;

  questions$: Observable<QuestionBase<any>[]>;

  @ViewChild('modal') modalRef: ElementRef<HTMLDivElement>;
  @Output() modalClose: EventEmitter<EmitPayload> = new EventEmitter();

  constructor(private questionService: QuestionService) {}

  //this id is a problem, make it nullable!!!!!
  ngOnInit() : void {
    this.questions$ = this.questionService
      .getQuestions(this.modalDto.questions, this.modalDto.model?.id);
  }

  closeModal() {
    this.modalRef.nativeElement.style.display = 'none';
    this.modalClose.emit(new EmitPayload(null, this.modalDto.edit));
  }

  onPayloadReady(payload: any): void {
    this.modalRef.nativeElement.style.display = 'none';
    this.modalClose.emit(new EmitPayload(payload, this.modalDto.edit));
  }
}
