import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent implements OnInit{
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404Error() {
    this.http.get(this.baseUrl + '/buggy/not-found').subscribe({
      next: (res) => {console.log(res)},
      error: (err) => {console.log(err)}
    });

  }

  get400Error() {
    this.http.get(this.baseUrl + '/buggy/bad-request').subscribe({
      next: (res) => {console.log(res)},
      error: (err) => {console.log(err)}
    });

  }

  get500Error() {
    this.http.get(this.baseUrl + '/buggy/server-error').subscribe({
      next: (res) => {console.log(res)},
      error: (err) => {console.log(err)}
    });

  }

  get401Error() {
    this.http.get(this.baseUrl + '/buggy/auth').subscribe({
      next: (res) => {console.log(res)},
      error: (err) => {console.log(err)}
    });

  }

  get400ValidationError() {
    this.http.post(this.baseUrl + '/account/register',{}).subscribe({
      next: (res) => {console.log(res)},
      error: (err) => {
        console.log(err);
        this.validationErrors = err;
      }
    });

  }

}
