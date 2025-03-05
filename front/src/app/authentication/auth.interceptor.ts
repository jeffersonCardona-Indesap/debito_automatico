import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtén el token de autenticación (por ejemplo, desde un servicio)
    const authToken = localStorage.getItem('authToken');

    // Clona la solicitud y agrega el token en el encabezado
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    // Envía la solicitud modificada
    return next.handle(request);
  }
}
