import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserParams } from "../../_models/helperDTOs/userParams";
import { getPaginatedResult, getPaginationHeaders } from "./paginationHelper";
import { environment } from "../../../environments/environment";

export class BaseService {

    protected baseUrl: string;
    protected route: string;
    protected userParams: UserParams = new UserParams();

    constructor(protected httpClient: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }

    protected init(route) {
        this.route = route;
    }

    getPaginated(): Observable<any> {
        let params = getPaginationHeaders(this.userParams.pageNumber, this.userParams.pageSize);
        
        this.userParams.machine != '' && (params = params.append('machine', this.userParams.machine));
        this.userParams.shift != '' && ( params = params.append('shift', this.userParams.shift));
        this.userParams.operator != '' && (params = params.append('operator', this.userParams.operator));
        this.userParams.startDate != '' && (params = params.append('startDate', this.userParams.startDate));
        this.userParams.endDate != '' && (params = params.append('endDate', this.userParams.endDate));

        return getPaginatedResult<any[]>(this.formUrl(), params, this.httpClient); 
    }

    add(model: any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type','application/json; charset=utf-8');

        return this.httpClient.post<any>
            (this.formUrl() + '/add', model, { headers : headers });
    }

    update(model: any) : Observable<any> {
        const headers = new HttpHeaders().set('Content-Type','application/json; charset=utf-8');

        return this.httpClient.put(this.formUrl() + '/update', model, {headers: headers});
    }

    delete(id: any) {
        return this.httpClient.delete(this.formUrl() + '/delete/' + id);
    }

    getRaw() : Observable<any> {
        return this.httpClient.get<any[]>(this.formUrl() + '/getRaw');
    }

    getFilterParams() {
        return this.userParams;
    }
    
    setFilterParams(params: UserParams) {
        this.userParams = params;
    }

    protected formUrl(entity?: any): string {
        let urlParams = '';
        
        if(entity && entity.id) {
            urlParams = '/' + entity.id;
        }

        return this.baseUrl + this.route + urlParams;
    }
}