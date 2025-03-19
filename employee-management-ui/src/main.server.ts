/**
 * main.server.ts
 *
 * This file initializes the Angular Server-Side Rendering (SSR) application.
 * It bootstraps the `AppComponent` using the server-specific configuration.
 *
 * Features:
 * - Uses `bootstrapApplication()` to start the application on the server.
 * - Loads the server configuration from `app.config.server.ts`.
 * - Ensures proper SSR setup by merging client and server configurations.
 *
 * Dependencies:
 * - `bootstrapApplication`: Initializes the Angular application.
 * - `AppComponent`: The root component of the application.
 * - `config`: The server-specific configuration settings.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Function to bootstrap the Angular SSR application.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
