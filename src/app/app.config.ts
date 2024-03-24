import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import {
  ApplicationConfig,
  APP_INITIALIZER,
  importProvidersFrom,
} from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
      }),
      withComponentInputBinding()
    ),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule), provideAnimationsAsync(),
  ],
};
