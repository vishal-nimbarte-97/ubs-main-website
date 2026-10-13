import { ApplicationConfig } from '@angular/core';
// import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './services/loading/loading.interceptor';

import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';



export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes, withHashLocation()),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideRouter(routes,withHashLocation(),withInMemoryScrolling({ anchorScrolling: 'enabled' })
    ),
  ],
};
