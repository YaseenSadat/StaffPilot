/**
 * app.routes.server.ts
 *
 * This file defines the server-side routing configuration for Angular SSR (Server-Side Rendering).
 * It specifies how requests should be handled on the server, including pre-rendering settings.
 *
 * Features:
 * - Uses `RenderMode.Prerender` to pre-render all unmatched routes.
 * - Ensures that server-side requests are correctly processed.
 *
 * Dependencies:
 * - `ServerRoute`: Defines server-specific routes.
 * - `RenderMode`: Specifies how routes should be rendered on the server.
 */

import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Defines the server-side routes for Angular SSR.
 * 
 * - The wildcard (`'**'`) matches all undefined routes.
 * - `RenderMode.Prerender` ensures that content is pre-rendered before being served.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
