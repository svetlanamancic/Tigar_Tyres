import { Component } from '@angular/core';
import { TableComponent } from '../common/table/table.component';
import { tyreHeaders } from '../_headers/tyresHeaders';
import { ModalComponent } from '../common/modal/modal.component';
import { TyreService } from '../_services/tyre.service';
import { CommonModule, DatePipe } from '@angular/common';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { Modal } from '../_models/helperDTOs/modal';
import { BaseComponent } from '../baseComponent';

@Component({
  selector: 'app-tyres',
  standalone: true,
  imports: [TableComponent, ModalComponent, CommonModule, PaginationComponent],
  templateUrl: './tyres.component.html',
  styleUrl: './tyres.component.css',
  providers: [DatePipe]
})
export class TyresComponent extends BaseComponent {

  constructor(private tyreService: TyreService) {
    super(
      tyreService, 
      tyreHeaders, 
      new Modal(false, "Create new tyre record", "tyre", false)
      //implement modal with provider instead passing it like this
    );
  }

  ngOnInit() : void {
    this.setDataSource();
  }
}
