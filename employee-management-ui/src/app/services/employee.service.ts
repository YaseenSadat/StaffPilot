/**
 * employee.service.ts
 *
 * This service provides methods for managing employee data via HTTP requests.
 * It handles fetching, adding, updating, and deleting employees using a RESTful API.
 *
 * Features:
 * - Uses Angular's `HttpClient` to communicate with the backend API.
 * - Provides methods for CRUD operations.
 * - Uses `Observable` to handle asynchronous data fetching.
 *
 * Dependencies:
 * - `HttpClient`: Handles HTTP requests to the API.
 * - `Observable`: Enables reactive data handling.
 *
 * API Endpoints:
 * - `GET /api/employees` - Fetch all employees.
 * - `GET /api/employees/{id}` - Fetch a specific employee by ID.
 * - `POST /api/employees` - Add a new employee.
 * - `PUT /api/employees/{id}` - Update an existing employee.
 * - `DELETE /api/employees/{id}` - Remove an employee.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface representing an employee.
 */
export interface Employee {
  id?: number;     // Optional because it is auto-generated
  name: string;    // Employee name
  role: string;    // Employee role/job title
  department: string; // Employee department
  salary: number;  // Employee salary
}

@Injectable({
  providedIn: 'root' // Makes the service available throughout the app
})
export class EmployeeService {
  /**
   * Base URL of the employee API.
   */
  private apiUrl = 'http://localhost:5291/api/employees';

  /**
   * Constructor injecting HttpClient for API requests.
   *
   * @param {HttpClient} http - Angular service for handling HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches all employees from the API.
   *
   * @returns {Observable<Employee[]>} - An observable containing an array of employees.
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  /**
   * Fetches a single employee by ID.
   *
   * @param {number} id - The unique ID of the employee.
   * @returns {Observable<Employee>} - An observable containing the employee data.
   */
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  /**
   * Adds a new employee to the system.
   *
   * @param {Employee} employee - The employee object to be added.
   * @returns {Observable<Employee>} - An observable containing the newly created employee.
   */
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  /**
   * Updates an existing employee's details.
   *
   * @param {number} id - The unique ID of the employee to be updated.
   * @param {Employee} employee - The updated employee object.
   * @returns {Observable<void>} - An observable indicating the update status.
   */
  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, employee);
  }

  /**
   * Deletes an employee from the system.
   *
   * @param {number} id - The unique ID of the employee to be deleted.
   * @returns {Observable<void>} - An observable indicating the deletion status.
   */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
