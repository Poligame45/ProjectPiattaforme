import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, of, throwError } from "rxjs";
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {


    constructor(private loginService: LoginService, private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const authToken = this.loginService.getAuthorizationToken();
        if (!!authToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(request).pipe(catchError(x => this.handleError(x)));
    }
    private handleError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            sessionStorage.clear();
            alert("Email o password sbagliati");
            this.router.navigateByUrl(`/login`);
            return of(err.message);
        }else if(err.status === 403){
            alert("Non hai l'autorizzazione per visualizzare questa pagina");
            this.router.navigateByUrl(`/home`);
        }else if (err.status === 400){
            alert("Email già presente nel sistema");
            this.router.navigateByUrl(`/register`);

        }
        return throwError(() => err);
    }
}