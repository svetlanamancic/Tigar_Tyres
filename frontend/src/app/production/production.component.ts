import { Component } from '@angular/core';
import { productionHeaders } from '../_headers/productionHeaders';
import { CommonModule, DatePipe } from '@angular/common';
import { TableComponent } from '../common/table/table.component';
import { ProductionService } from '../_services/production.service';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { ModalComponent } from '../common/modal/modal.component';
import { InlineFormComponent } from "../common/forms/inline-form/inline-form.component";
import { Observable } from 'rxjs';
import { QuestionBase } from '../_questions/questionBase';
import { Modal } from '../_models/helperDTOs/modal';
import { BaseComponent } from '../baseComponent';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [
      CommonModule, 
      TableComponent, 
      PaginationComponent, 
      ModalComponent, 
      InlineFormComponent,
      DatePipe
  ],
  templateUrl: './production.component.html',
  styleUrl: './production.component.css',
  providers: [DatePipe]
})
export class ProductionComponent extends BaseComponent{

  questions$: Observable<QuestionBase<any>[]>;

  constructor(private productionService: ProductionService, 
    protected accountService: AccountService) {
      super( 
        productionService, 
        productionHeaders, 
        new Modal(false, "Register production", "production", false));
    }

  ngOnInit(): void {
    this.setDataSource();
    this.questions$ = this.questionService.getQuestions("filter");
  }

  //move this into baseComponent!
  onDeleteRequested(item: any) {
    if(item.id) {
      this.service.delete(item.id).subscribe({
        next: () => { this.setDataSource() },
        error: (err) => this.toastr.error(err.error)
      });
    }
  }

  filterData(filterParams) {
    this.mapParams(filterParams);
    this.setDataSource();
  }

  mapParams(filterParams) {
    this.params.machine =  filterParams.machine ? filterParams.machine : '';
    this.params.operator = filterParams.operator ? filterParams.operator : '';
    this.params.shift = filterParams.shift ? filterParams.shift : '';
    this.params.startDate = filterParams.date ? this.datePipe.transform(filterParams.date[0],'dd-MM-YYYY') : '';
    this.params.endDate =  filterParams.date ? this.datePipe.transform(filterParams.date[1],'dd-MM-YYYY') : '';
  }

  //generate pdf report for business unit leader --- temporary, 
  //implement report generating on backend with IronPdf and Razor pages templates
  generatePdf() {
    //change hardcoded columns!!!! -- get from tableHeaders!!!!
    const columns = [
      {name: 'Production Date', field: 'productionDate'},
      {name: 'Tyre', field: 'tyre'},
      {name: 'Shift', field: 'shift'},
      {name: 'Machine', field: 'machine'},
      {name: 'Operator', field: 'operator'},
      {name: 'Quantity', field: 'quantity'}
    ];

    const headers = columns.map((column) => ({text: column.name, style: 'tableHeader'}));

    //map each row to column based on field type
    const rows = this.dataSource.map((item) => {
      const cells = columns.map((column) => ({text: item[column.field]}));
      return cells;
    });

    //generate custom report name!!!!!
    let reportTitle = "PRODUCTION REPORT";

    let filter = "";
    
    if (this.params.startDate != "") {
      filter = "Production from " + this.params.startDate + " to " + this.params.endDate;
    }

    if (this.params.operator != "") {
      filter = filter + "\n Operator: " + this.params.operator;
    }

    if (this.params.shift != "") {
      filter = filter + "\n Shift: " + this.params.shift;
    }

    if (this.params.machine != "") {
      filter = filter + "\n Machine: " + this.params.machine;
    }

    const docDefinition = {
      //pdf page content
      content: [
        { text: reportTitle, style: 'header' }, //title
        { text: filter, style: 'filter'}, //filters
        { table:  //table
          { headerRows: 1, widths: headers.map(() => '*'), body: [headers,...rows] },
          layout: 'lightHorizontalLines'
        },
      ],
      styles: { //pdf page styles
        header: { fontSize: 22, margin: [0, 0, 0, 30], alignment: 'center' },
        filter: { fontSize: 9, margin: [0, 0, 0, 20], alignment: 'left' },
        tableHeader: {fontSize: 11, bold: true, alignment: 'left'}
      }
    };

    //figure out how to change fonts -- library fonts not working as expected
    pdfMake.vfs = pdfFonts.vfs_fonts;
    pdfMake.createPdf(docDefinition).download('report.pdf');
  }

  

}

