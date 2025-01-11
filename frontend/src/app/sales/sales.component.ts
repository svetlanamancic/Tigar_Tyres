import { Component } from '@angular/core';
import { salesHeaders } from '../_headers/salesHeaders';
import { TableComponent } from '../common/table/table.component';
import { ModalComponent } from '../common/modal/modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import { SalesService } from '../_services/sales.service';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { Modal } from '../_models/helperDTOs/modal';
import { BaseComponent } from '../baseComponent';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [TableComponent, ModalComponent, CommonModule, PaginationComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
  providers: [DatePipe]
})
export class SalesComponent extends BaseComponent{

  constructor (private salesService:SalesService, 
      protected accountService: AccountService) {
    
        super(salesService, salesHeaders, 
          new Modal(false, "Register sales", "sales", false));
  }

  ngOnInit(): void {
    this.setDataSource();
  }

  onDeleteRequested(item: any) {
    if (item != null) {
      this.service.delete(item.id).subscribe({
        next: () => { this.setDataSource() },
        error: (err) => console.log(err)
      });
    }
  }

}
