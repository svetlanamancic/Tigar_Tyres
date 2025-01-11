import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  model: any = {}
  errorMessage: string = "";
    
  constructor(private accountService: AccountService, private router:Router) {}

  ngOnInit(): void {
    this.accountService.isLoggedIn() && this.router.navigate(['/production']);
  }

  login() {
    this.errorMessage = '';
    this.accountService.login(this.model).subscribe({
      next: (response) => { 
        this.router.navigate(['/production']);
      },
      error: (err) => { this.errorMessage = "Username and password don't match any of the users." }
    });
  }

  logout() {
    this.accountService.logout();
  }


}
