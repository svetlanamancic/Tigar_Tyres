export class QuestionBase<T> {
    value: T | undefined;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    placeholder: string;
    minlength: number;
    placement: string;
    options: {key: string; value: string}[];
    min: number;
    constructor(
      options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        placeholder?: string;
        minlength?: number;
        min?: number;
        placement?: string;
        options?: {key: string; value: string}[];
      } = {},
    ) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.options = options.options || [];
      this.placeholder = options.placeholder;
      this.minlength = options.minlength || 0;
      this.min = options.min || -1;
      this.placement = options.placement || "bottom";

    }
  }