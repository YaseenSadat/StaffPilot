/**
 * server.ts
 *
 * This file sets up an Express.js server to serve the Angular Universal (SSR) application.
 * It also configures static file serving and API request handling.
 *
 * Features:
 * - Uses Express.js to serve the Angular app and static assets.
 * - Implements Angular Universal SSR with `AngularNodeAppEngine`.
 * - Serves static files from the `/browser` directory.
 * - Handles API requests and dynamically renders Angular pages.
 * - Starts the server on the specified port or defaults to 4000.
 *
 * Dependencies:
 * - `AngularNodeAppEngine`: Manages SSR for Angular applications.
 * - `createNodeRequestHandler`: Handles incoming server requests.
 * - `express`: Provides the Express.js web framework.
 * - `fileURLToPath`, `dirname`, `resolve`: Used for handling file paths.
 * - `writeResponseToNodeResponse`: Writes SSR responses to Express responses.
 */

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Paths for the server and browser build directories.
 */
const serverDistFolder = dirname(fileURLToPath(import.meta.url)); // Path to server build output
const browserDistFolder = resolve(serverDistFolder, '../browser'); // Path to browser build output

/**
 * Initialize the Express application and Angular SSR engine.
 */
const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express REST API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from the `/browser` directory.
 * - `maxAge: '1y'`: Caches static assets for up to one year.
 * - `index: false`: Prevents serving `index.html` automatically.
 * - `redirect: false`: Prevents automatic redirection to `/index.html`.
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all remaining requests by rendering the Angular application using SSR.
 * - Uses `angularApp.handle(req)` to process requests.
 * - If a response is generated, it is written to the HTTP response.
 * - If no response is generated, the request is passed to the next middleware.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Starts the Express server if this file is executed directly.
 * - Uses `isMainModule(import.meta.url)` to check if it's the main entry point.
 * - Listens on the port specified in `process.env.PORT`, defaulting to `4000` if not set.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Exports the request handler for use with Angular CLI and cloud functions.
 * - This allows integration with Firebase, AWS Lambda, or other serverless platforms.
 */
export const reqHandler = createNodeRequestHandler(app);
