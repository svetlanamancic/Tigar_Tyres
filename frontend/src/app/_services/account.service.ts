import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  roleAs: string;

  //observable buffer object, emits last value inside it
  private currentUserSource = new ReplaySubject<User>(1);
  
  currentUser$ = this.currentUserSource.asObservable();

  //use this principle to inject other services where needed 
  //instead passing into constructor
  private router = inject(Router);

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl + '/account/login', model).pipe(
      map((response: User) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
      }));
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.roleAs = "";
    this.currentUserSource.next(null);
    this.router.navigate(["/login"]);
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('user');
    if (loggedIn) 
      return true;
    else 
      return false;
  }

  getRole() {
    this.currentUser$.subscribe({
      next: (data) => {
        data && (this.roleAs = data.role)
      }
    });
    return this.roleAs;
  }
}
