import { Component } from '@angular/core';
import { TableComponent } from "../common/table/table.component";
import { userHeaders } from '../_headers/userHeaders';
import { UserService } from '../_services/user.service';
import { AppUser } from '../_models/appUser';
import { Pagination } from '../_models/helperDTOs/pagination';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { ModalComponent } from '../common/modal/modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import { UserParams } from '../_models/helperDTOs/userParams';
import { Modal } from '../_models/helperDTOs/modal';
import { TableDTO } from '../_models/helperDTOs/tableDTO';
import { ToastrService } from 'ngx-toastr';
import { ToastrComponent } from '../common/toastr/toastr.component';
import { ToastrDTO } from '../_models/helperDTOs/toastrParams';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableComponent,
    PaginationComponent,
    ModalComponent,
    CommonModule,
    ToastrComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  
  //modal properties
  modal: Modal = new Modal(false, "Create new user", "user", false);
  toastrDto: ToastrDTO = new ToastrDTO("display-hide");

  //table properties
  dataSource: AppUser[] = [];
  pagination: Pagination;
  tableDto: TableDTO;
  params: UserParams = new UserParams();

  constructor(private userService: UserService, 
      private toastr: ToastrService) {}

  ngOnInit(): void {
    this.setDataSource();
  }

  setDataSource() {
    this.userService.setFilterParams(this.params);
    this.userService.getPaginated().subscribe({
      next: (response) => {
        this.tableDto = new TableDTO(userHeaders, response.result);
        this.dataSource = response.result;
        this.pagination =  response.pagination;
      },
      error: (err) => {}
    });
  }

  onPageChange(page: number): void {
    this.params.pageNumber = page;
    this.setDataSource();
  }

  showForm() {
    this.modal.toggle = true;
  }

  modalClosed(user: any) {
    this.modal.toggle = false;

    if( user.model !== null && user.model !== undefined) {
      if(!user.editFlag) {
        this.userService.addUser(user.model).subscribe({
          next: () => {this.setDataSource()},
          error: (err) => {
            this.toastr.error(err.error);
            // this.toastrDto.message = err.error;
            // this.toastrDto.title = "Error";
            // this.toastrDto.type = "error";
            // this.toastrDto.toastrClass = "toast show toastr-display display-show";
          }
        });
      }
      else {
      }
    }
    this.modal.edit = false;
  }

  onEditRequested(item) {
    this.modal.model = item;
    this.modal.edit = true;
    this.showForm();
  }

}
