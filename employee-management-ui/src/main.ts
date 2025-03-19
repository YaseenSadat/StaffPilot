/**
 * main.ts
 *
 * This file serves as the entry point for the Angular application.
 * It bootstraps the `AppComponent` and sets up necessary providers.
 *
 * Features:
 * - Uses `bootstrapApplication()` to initialize the application without `NgModule`.
 * - Provides HTTP client services for API communication.
 * - Configures routing with `provideRouter()`.
 * - Imports Angular Material and FormsModule for UI and form handling.
 *
 * Dependencies:
 * - `bootstrapApplication`: Initializes the Angular app.
 * - `provideRouter`: Configures application routing.
 * - `provideHttpClient`: Enables HTTP requests using Angular's HttpClient.
 * - `importProvidersFrom`: Imports additional modules into the application.
 * - `FormsModule`: Enables template-driven forms.
 * - `MaterialModule`: Provides Angular Material components.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { MaterialModule } from './app/shared/material.module';

/**
 * Bootstraps the Angular application with necessary providers.
 * 
 * - `provideHttpClient()` enables HTTP communication.
 * - `provideRouter(routes)` sets up application routing.
 * - `importProvidersFrom(FormsModule, MaterialModule)` imports required modules.
 */
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Enables HTTP requests
    provideRouter(routes), // Configures application routing
    importProvidersFrom(FormsModule, MaterialModule) // Imports form handling and Material UI components
  ]
}).catch(err => console.error(err)); // Logs errors if the application fails to start
