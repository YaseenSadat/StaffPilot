/**
 * app.config.ts
 *
 * This file defines the global application configuration for Angular.
 * It sets up core services, including routing, HTTP client, and zone change detection.
 *
 * Features:
 * - Configures Angular’s routing system using `provideRouter()`.
 * - Enables `HttpClientModule` for making HTTP requests.
 * - Optimizes zone change detection for improved performance.
 * - Supports client hydration with event replay for SSR (Server-Side Rendering).
 *
 * Dependencies:
 * - `ApplicationConfig`: Defines the application's provider configuration.
 * - `provideZoneChangeDetection`: Optimizes Angular's change detection mechanism.
 * - `importProvidersFrom`: Allows importing modules into the application.
 * - `provideRouter`: Configures Angular's routing system.
 * - `HttpClientModule`: Enables HTTP requests to external APIs.
 * - `provideClientHydration`: Supports SSR hydration with event replay.
 * - `routes`: Defines the application's routing structure.
 */

import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

/**
 * The main application configuration object.
 * This object is merged with additional configurations when needed (e.g., server-side settings).
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimizes change detection
    provideRouter(routes), // Sets up application routing
    provideClientHydration(withEventReplay()), // Enables client-side hydration with event replay
    importProvidersFrom(HttpClientModule) // Imports the HttpClientModule for API calls
  ]
};
