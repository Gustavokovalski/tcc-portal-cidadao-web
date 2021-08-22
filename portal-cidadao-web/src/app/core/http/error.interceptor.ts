import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authService.logout();
                history.go();
            }

            if (err.status === 403) {
                // return throwError({ sucesso: false, mensagens: [{ nome: 'Acesso Negado!', descricao: 'Você não possui acesso a esse recurso.' }] } as IBaseModel<any>);
                return throwError("");
            }

            const error = err || err.statusText;
            return throwError(error);
        }))
    }
}