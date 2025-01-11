import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableDTO } from '../../_models/helperDTOs/tableDTO';
import { AccountService } from '../../_services/account.service';
import { userHeaders } from '../../_headers/userHeaders';
import { tyreHeaders } from '../../_headers/tyresHeaders';
import { machineHeaders } from '../../_headers/machineHeaders';
import { of } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() tableDto: TableDTO;

  @Output() editItem: EventEmitter<any> = new EventEmitter();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();

  constructor(protected accountService: AccountService) {}

  //maps data to columns in table no matter the order in json
  //based on field defined inside tableHeaders
  mapData(column, row) {
    var mappedData = [];

    column.forEach(element => {
      mappedData.push(row[element.field]);
    });

    return mappedData;
  }
    
  //send signal to main component to open modal with populated fields and edit flag
  edit(row) { 
    this.editItem.emit(row);
  }

  delete(row) {
    this.deleteItem.emit(row);
  }

  //dont toggle buttons for user, tyre and machine tables
  //only toggle buttons for Admin and Supervisor roles
  toggleButtons() {
    
    if (this.tableDto?.headers == userHeaders || 
      this.tableDto?.headers == tyreHeaders || 
      this.tableDto?.headers == machineHeaders) {

      return false;
    }

    if (this.accountService.getRole() == 'Admin' || this.accountService.getRole() == 'Quality Supervisor') {
      return true;
    }

    return false;
  }
}
