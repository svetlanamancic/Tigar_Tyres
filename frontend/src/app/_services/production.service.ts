import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './helpers/baseService';

@Injectable({
  providedIn: 'root'
})
export class ProductionService extends BaseService {


  constructor(protected override httpClient:HttpClient) {
    super(httpClient);

    this.init('/production');
   }

}
