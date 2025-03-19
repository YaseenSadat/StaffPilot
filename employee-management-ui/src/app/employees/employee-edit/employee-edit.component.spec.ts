/**
 * employee-edit.component.ts
 * 
 * This component provides a dialog-based interface for editing employee details.
 * Users can modify an employee's name, role, department, and salary using an Angular Material modal dialog.
 * 
 * Features:
 * - Uses Angular Material Dialog for an interactive and responsive modal.
 * - Two-way data binding (`ngModel`) to modify employee details.
 * - Ensures the original employee data remains unmodified until saved.
 * - Provides cancel and save functionalities.
 * 
 * Dependencies:
 * - Angular Material components: `MatDialogModule`, `MatFormFieldModule`, `MatInputModule`, `MatButtonModule`.
 * - Angular Forms Module (`FormsModule`) for handling form input.
 * - CommonModule for Angular core functionalities.
 * 
 * Inputs:
 * - `data` (Employee): Injected employee data from the parent component.
 * 
 * Outputs:
 * - `onCancel()`: Closes the dialog without applying changes.
 * - `onSave()`: Closes the dialog and returns the modified employee data.
 */

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {
  /**
   * Holds a copy of the employee data being edited.
   * Prevents direct modification of the original data before saving.
   */
  employee: Employee;

  /**
   * Injects dependencies and initializes a local copy of the employee data.
   * 
   * @param {MatDialogRef<EmployeeEditComponent>} dialogRef - Reference to the dialog instance.
   * @param {Employee} data - The employee data passed from the parent component.
   */
  constructor(
    public dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employee = { ...data }; // Creates a shallow copy to avoid modifying the original reference.
  }

  /**
   * Closes the dialog without saving changes.
   */
  onCancel(): void {
    this.dialogRef.close(null);
  }

  /**
   * Closes the dialog and returns the modified employee data.
   */
  onSave(): void {
    this.dialogRef.close(this.employee);
  }
}
