/**
 * server.config.ts
 *
 * This file defines the server-side configuration for Angular's SSR (Server-Side Rendering).
 * It merges the base application configuration (`appConfig`) with server-specific settings.
 *
 * Features:
 * - Enables Server-Side Rendering (SSR) using `provideServerRendering()`.
 * - Configures server-side routing with `provideServerRouting(serverRoutes)`.
 * - Merges the SSR configuration with the base application configuration.
 *
 * Dependencies:
 * - `mergeApplicationConfig`: Merges multiple configuration objects into one.
 * - `ApplicationConfig`: Angular’s application configuration type.
 * - `provideServerRendering`: Enables server-side rendering support.
 * - `provideServerRouting`: Configures server-side routing for Angular SSR.
 * - `appConfig`: The base application configuration.
 * - `serverRoutes`: Defines the server-specific routing configuration.
 */

import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

/**
 * Server-specific configuration settings for Angular SSR.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), // Enables server-side rendering
    provideServerRouting(serverRoutes) // Configures server-side routing
  ]
};

/**
 * Merges the base application configuration with the server configuration.
 * This ensures that both client and server settings are applied correctly.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
