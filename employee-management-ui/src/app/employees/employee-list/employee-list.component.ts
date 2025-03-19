/**
 * employee-list.component.ts
 *
 * This component manages the employee list, providing functionalities for:
 * - Displaying employees in a table with sorting, filtering, and pagination.
 * - Adding new employees via a form.
 * - Editing employee details using a modal dialog.
 * - Deleting employees from the list.
 *
 * Features:
 * - Uses Angular Material components for UI elements (table, dialog, paginator, sort).
 * - Fetches employee data from `EmployeeService`.
 * - Implements two-way data binding for adding new employees.
 * - Utilizes `MatTableDataSource` for handling employee data operations.
 *
 * Dependencies:
 * - `MatDialog`: For modal dialogs when editing an employee.
 * - `MatTableDataSource`: Manages the table data, including filtering and sorting.
 * - `MatPaginator`, `MatSort`: Provides pagination and sorting functionalities.
 * - `EmployeeService`: Handles API calls related to employee management.
 * - `NgForm`: Handles form validation and reset functionality.
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { MaterialModule } from '../../shared/material.module'; // Shared module with Material components
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee, EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  /**
   * Defines the columns displayed in the employee table.
   */
  displayedColumns: string[] = ['id', 'name', 'role', 'department', 'salary', 'actions'];

  /**
   * Data source for the Material Table, using MatTableDataSource for sorting, filtering, and pagination.
   */
  dataSource = new MatTableDataSource<Employee>();

  /**
   * Stores the value entered in the search bar for filtering employees.
   */
  filterValue: string = '';

  /**
   * Reference to the paginator for handling pagination.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Reference to the sorting functionality of the table.
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Stores data for a new employee before adding to the database.
   */
  newEmployee: Employee = {
    name: '',
    role: '',
    department: '',
    salary: 0
  };

  /**
   * Constructor injects necessary services for handling employee data and dialog interactions.
   *
   * @param {EmployeeService} employeeService - Handles API calls for employee CRUD operations.
   * @param {MatDialog} dialog - Manages opening and closing of the employee edit dialog.
   */
  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook that initializes the component and loads employees from the API.
   */
  ngOnInit(): void {
    this.loadEmployees();
  }

  /**
   * Fetches the list of employees from the API and assigns paginator and sorting features to the table.
   */
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }
    });
  }

  /**
   * Filters the employee list based on user input in the search bar.
   */
  applyFilter(): void {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  /**
   * Adds a new employee to the database and refreshes the table.
   * After a successful addition, the form is reset.
   *
   * @param {NgForm} employeeForm - The form reference for resetting after submission.
   */
  addEmployee(employeeForm: NgForm): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: () => {
        this.loadEmployees(); // Refresh the table with the updated list
        employeeForm.resetForm(); // Reset form fields
        this.newEmployee = { name: '', role: '', department: '', salary: 0 }; // Reinitialize the object
      },
      error: (err) => {
        console.error('Error adding employee:', err);
      }
    });
  }

  /**
   * Deletes an employee by ID and refreshes the employee list.
   *
   * @param {number | undefined} id - The unique ID of the employee to be deleted.
   */
  deleteEmployee(id: number | undefined): void {
    if (!id) return;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees(); // Refresh employee list after deletion
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
      }
    });
  }

  /**
   * Opens a dialog for editing an employee's details.
   * After closing, if the user saves changes, it updates the employee in the database.
   *
   * @param {Employee} employee - The selected employee data to be edited.
   */
  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeEditComponent, {
      width: '400px',
      data: employee
    });

    dialogRef.afterClosed().subscribe((result: Employee | null) => {
      if (result) {
        this.employeeService.updateEmployee(result.id!, result).subscribe({
          next: () => this.loadEmployees(),
          error: (err) => {
            console.error('Error updating employee:', err);
          }
        });
      }
    });
  }
}
