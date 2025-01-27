import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { appStoreReducer } from './store/appstore.reducers';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),

    // Enable dev tools
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

    // Provide the store with the appStoreReducer
    provideState('appdata', appStoreReducer),
  ],
};
