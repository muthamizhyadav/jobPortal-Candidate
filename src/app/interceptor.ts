import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoaderServiceService } from './loader-service.service';

@Injectable()
export class ExampleInterceptor implements HttpInterceptor {
  constructor(private loderService: LoaderServiceService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loderService.requestStart();

    return this.handler(next, httpRequest);
  }
  handler(next: any, request: any) {
    return next.handle(request).pipe(
      tap(
        (e: any) => {
          if (e instanceof HttpResponse) {
            setTimeout(() => {
              this.loderService.requestEnd();
            }, 500);
          }
        },
        (error) => {
          if (error) {
            this.loderService.resetSpinner();
          }
        }
      )
    );
  }
}
