import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { RegisterService } from '../services/register.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private registerService: RegisterService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.registerService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}