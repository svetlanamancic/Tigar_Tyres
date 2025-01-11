import { Component, Input } from '@angular/core';
import { ToastrDTO } from '../../_models/helperDTOs/toastrParams';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.css'
})
export class ToastrComponent {

  //not finished
  @Input() toastrDto: ToastrDTO;

  constructor() {}

  closeToastr() {
    this.toastrDto.toastrClass = "display-hide";
  }

}
