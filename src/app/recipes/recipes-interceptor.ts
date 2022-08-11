import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
 
@Injectable()
export class RecipesInterceptorService implements HttpInterceptor {
  
  private AUTH_HEADER = "Token";

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    req = this.addAuthenticationToken(req);
    return next.handle(req).pipe(
        catchError((error) => {
          const errorMsg = error?.error || error?.error?.text;
          // IF ERROR CONTAINS THE MENTION OF A TOKEN WE JUST REROUTE THE USER TO THE LOGIN PAGE
          if (errorMsg.includes("token") || errorMsg.includes("Token")) {
            window.USER = null;
            localStorage.clear();
            return this.router.navigate(['/login']);
          }
          return throwError(error);
        })
    ) as any;
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const jwt = localStorage.getItem('intelli-token');
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!jwt) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, jwt)
    });
  }

}