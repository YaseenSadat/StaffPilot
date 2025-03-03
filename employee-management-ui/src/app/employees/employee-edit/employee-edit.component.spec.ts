// src/app/employees/employee-edit/employee-edit.component.ts
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
  // Create a copy of the employee data so we don't modify the original directly.
  employee: Employee;

  constructor(
    public dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employee = { ...data };
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close(null);
  }

  onSave(): void {
    // Close the dialog and return the updated employee data
    this.dialogRef.close(this.employee);
  }
}
