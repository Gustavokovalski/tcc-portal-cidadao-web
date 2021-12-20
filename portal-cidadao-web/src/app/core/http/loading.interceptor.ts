import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isPolling = request.params.get('polling');
    if (!isPolling) this.spinner.show();

    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          this.spinner.hide();
          return err;
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.spinner.hide();
          }
          return evt;
        })
      );
  }
}
