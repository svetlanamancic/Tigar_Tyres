import { Component } from '@angular/core';
import { TableComponent } from '../common/table/table.component';
import { machineHeaders } from '../_headers/machineHeaders';
import { MachineService } from '../_services/machine.service';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { ModalComponent } from '../common/modal/modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Modal } from '../_models/helperDTOs/modal';
import { BaseComponent } from '../baseComponent';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [
    TableComponent, 
    PaginationComponent, 
    ModalComponent, 
    CommonModule
  ],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css',
  providers: [DatePipe]
})
export class MachinesComponent extends BaseComponent{

  constructor(private machineService: MachineService) {
    super(
      machineService, 
      machineHeaders, 
      new Modal(false, "Create new machine", "machine", false)
    );
  }

  ngOnInit() : void {
    this.setDataSource();
  }

}
