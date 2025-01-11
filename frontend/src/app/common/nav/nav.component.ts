import { Component } from '@angular/core';
import { navbarData } from './nav-data';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {
  isDropdownOpen = false;
  menus = navbarData;

  constructor(protected accountService:AccountService) {}

  toggleDropdown() {
    this.isDropdownOpen = true;
  }

  untoggleDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.accountService.logout();
  }


}



