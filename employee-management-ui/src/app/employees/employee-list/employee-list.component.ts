// src/app/employees/employee-list/employee-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';


// Import Angular Material modules via your shared module
import { MaterialModule } from '../../shared/material.module';

// Also import additional Material modules if needed
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
  displayedColumns: string[] = ['id', 'name', 'role', 'department', 'salary', 'actions'];
  dataSource = new MatTableDataSource<Employee>();

  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  newEmployee: Employee = {
    name: '',
    role: '',
    department: '',
    salary: 0
  };

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}
  

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        // Assign paginator and sort after data is loaded.
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

  applyFilter(): void {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: () => {
        this.loadEmployees();
        this.newEmployee = { name: '', role: '', department: '', salary: 0 };
      },
      error: (err) => {
        console.error('Error adding employee:', err);
      }
    });
  }

  deleteEmployee(id: number | undefined): void {
    if (!id) return;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
      }
    });
  }
  
  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeEditComponent, {
      width: '400px',
      data: employee
    });
  
    dialogRef.afterClosed().subscribe((result: Employee | null) => {
      if (result) {
        // Call your update method (assuming updateEmployee is implemented in your service)
        this.employeeService.updateEmployee(result.id!, result).subscribe({
          next: () => {
            this.loadEmployees(); // Refresh the list after update
          },
          error: err => {
            console.error('Error updating employee:', err);
          }
        });
      }
    });
  }
  
}

