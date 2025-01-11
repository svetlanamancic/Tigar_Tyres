import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  btnStyle = 'page-link';

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor() {}

  changePage(page: number) : void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(page);
      //update button styles
    }
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.pageChanged.emit(this.currentPage);
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.pageChanged.emit(this.currentPage);
  }

  isSelected(button: number) {
    return button === this.currentPage;
  }

}
