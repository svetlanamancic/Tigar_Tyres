import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../_models/appUser';
import { BaseService } from './helpers/baseService';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  url = environment.apiUrl;

  constructor(protected override httpClient:HttpClient) { 
    super(httpClient);

    this.init('/users');
  }

  addUser(model: any) {

    const headers = new HttpHeaders().set('Content-Type','application/json; charset=utf-8');

    return this.httpClient.post<AppUser>
      (this.url + '/account/register', model, { headers : headers });
  }

}
