import {QuestionBase} from './questionBase';

export class DateQuestion extends QuestionBase<string> {
  override controlType = 'date';
}