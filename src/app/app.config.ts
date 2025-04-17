import { ApplicationConfig, importProvidersFrom, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { DatePipe, UpperCasePipe } from '@angular/common';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    DatePipe,
    UpperCasePipe,
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }, provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }, provideAnimationsAsync(),
  

  ]
};
