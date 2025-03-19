/**
 * app.routes.ts
 *
 * This file defines the routing configuration for the application.
 * It specifies the available routes and their corresponding components.
 *
 * Features:
 * - Redirects the root URL (`'/'`) to the `/employees` route.
 * - Defines a route for displaying the employee list.
 *
 * Dependencies:
 * - `Routes`: Defines the application's route structure.
 * - `EmployeeListComponent`: The component responsible for displaying the employee list.
 */

import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';

/**
 * Application route configuration.
 * 
 * - `'/'` (root): Redirects to the `/employees` route.
 * - `'/employees'`: Loads the `EmployeeListComponent` to display the employee list.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' }, // Redirect root path to /employees
  { path: 'employees', component: EmployeeListComponent } // Employee list page
];
