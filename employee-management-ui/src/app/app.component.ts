/**
 * app.component.ts
 *
 * This is the root component of the application.
 * It serves as the main layout container, rendering the toolbar and routing outlet.
 *
 * Features:
 * - Uses Angular Material Toolbar (`MatToolbarModule`) for a consistent navigation bar.
 * - Implements `RouterOutlet` to dynamically display different pages based on routing.
 * - Defines the application title (`StaffPilot`).
 *
 * Dependencies:
 * - `RouterOutlet`: Enables dynamic rendering of routed components.
 * - `MatToolbarModule`: Provides a Material-styled toolbar.
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root', // Root component selector
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule], // Import necessary Angular modules
  templateUrl: './app.component.html', // Links to the HTML template
  styleUrls: ['./app.component.scss'] // Links to the SCSS file for styling
})
export class AppComponent {
  /**
   * The application title displayed in the toolbar.
   */
  title = 'StaffPilot';
}
