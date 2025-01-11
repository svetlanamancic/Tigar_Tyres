import { DatePipe } from "@angular/common";
import { Modal } from "./_models/helperDTOs/modal";
import { Pagination } from "./_models/helperDTOs/pagination";
import { UserParams } from "./_models/helperDTOs/userParams";
import { QuestionService } from "./_services/helpers/question.service";
import { TableDTO } from "./_models/helperDTOs/tableDTO";
import { ToastrService } from "ngx-toastr";
import { inject } from "@angular/core";

export class BaseComponent {
    protected service: any;
    protected headers: any;
    protected dataSource: any[] = [];
    protected pagination: Pagination;
    protected params: UserParams = new UserParams();
    protected modal: Modal;
    protected tableDto: TableDTO;

    protected datePipe = inject(DatePipe);
    protected questionService = inject(QuestionService);
    protected toastr = inject(ToastrService);

    constructor(service, headers, modal) {
       
        this.service = service;
        this.headers = headers;
        this.modal = modal;
    }

    setDataSource() {
        this.service.setFilterParams(this.params);
        this.service.getPaginated().subscribe({
          next: (response) => { 
            response.result.forEach(x => {
                x.productionDate && (x.productionDate = this.datePipe.transform(x.productionDate, 'mediumDate'));
                x.saleDate && (x.saleDate = this.datePipe.transform(x.saleDate, 'mediumDate'));
              });
            
            this.tableDto = new TableDTO(this.headers, response.result);
            this.dataSource = response.result;
            this.pagination = response.pagination;
          },
          error: (err) => console.log(err)
        });
      }

    onPageChange(page: number): void {
        this.params.pageNumber = page;
        this.setDataSource();
    }

    showForm() {
        this.modal.toggle = true;
    }
    
    modalClosed(payload: any) {
        this.modal.toggle = false;
        this.modal.model = null;

        if(payload.model !== null && payload.model !== undefined){
            if(!payload.editFlag) {
                this.service.add(payload.model).subscribe({
                    next: () => { this.setDataSource()},
                    error: (err) => this.toastr.error(err.error)

                });
            } 
            else {
                this.service.update(payload.model).subscribe({
                    next: (res) => { this.setDataSource() },
                    error: (err) => console.log(err)
                });
                //update tyre logic => when updating tyre and the price is updated its not changed in sales 
                //because its sold with old price, when updating code its not updated in sales, but affects new sales
                //because tyres are searched based on code the code should not be modified, lock the textbox
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