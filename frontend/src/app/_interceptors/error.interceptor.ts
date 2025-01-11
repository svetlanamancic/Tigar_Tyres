import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(error => {
        if(error) {
          switch (error.status) {
            case 400:
              if(error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if(error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throwError(() => modalStateErrors);
              }
              else {
                console.log(error.statusText, error.status);
              }
              break;
            case 401:
              // console.log(error.statusText, error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}}
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              break;
          }
        }
        return throwError(() => error);
      })
    );
  }
  
}