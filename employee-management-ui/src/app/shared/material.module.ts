/**
 * material.module.ts
 *
 * This module centralizes the imports and exports of Angular Material components.
 * It allows other modules in the application to use Material components without needing
 * to import them individually in each feature module.
 *
 * Features:
 * - Provides a single import point for commonly used Angular Material components.
 * - Simplifies module management by keeping Material imports in one place.
 * - Enhances maintainability by ensuring a consistent Material component setup.
 *
 * Dependencies:
 * - Angular Material components such as buttons, tables, dialogs, and form fields.
 *
 * Components Exported:
 * - `MatToolbarModule` - Provides Material-styled toolbars.
 * - `MatSidenavModule` - Enables Material-styled side navigation.
 * - `MatIconModule` - Allows use of Material icons.
 * - `MatButtonModule` - Styles buttons with Material design.
 * - `MatTableModule` - Provides a Material-styled table.
 * - `MatPaginatorModule` - Enables pagination functionality in tables.
 * - `MatSortModule` - Adds sorting functionality to Material tables.
 * - `MatFormFieldModule` - Styles and manages form field layouts.
 * - `MatInputModule` - Enables Material-styled input fields.
 * - `MatDialogModule` - Provides dialog modals for popups.
 * - `MatCardModule` - Implements Material-styled cards for layouts.
 */

import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatToolbarModule,  // Material-styled toolbar
    MatSidenavModule,  // Material sidebar navigation
    MatIconModule,     // Material icons
    MatButtonModule,   // Material-styled buttons
    MatTableModule,    // Material-styled table
    MatPaginatorModule, // Table pagination support
    MatSortModule,     // Table sorting support
    MatFormFieldModule, // Styled form fields
    MatInputModule,    // Material input fields
    MatDialogModule,   // Modal dialog support
    MatCardModule,     // Material-styled cards
  ]
})
export class MaterialModule {}
