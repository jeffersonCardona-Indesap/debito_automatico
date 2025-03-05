import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(),
    // provideTranslateService({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient],
    //   },
    //   defaultLanguage: 'es'
    // })
  ]
};

