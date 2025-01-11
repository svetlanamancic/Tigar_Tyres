import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./common/nav/nav.component";
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    NavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

@Injectable({providedIn: 'root'})
export class AppComponent implements OnInit{
  title = "";

  constructor(private http: HttpClient, public accountService: AccountService){}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  @HostListener('window:beforeunload',["$event"])
  loggout(event) {
    this.accountService.logout();
  }

}
