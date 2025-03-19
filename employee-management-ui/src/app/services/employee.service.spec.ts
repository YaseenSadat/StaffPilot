/**
 * employee.service.spec.ts
 *
 * This file contains unit tests for the EmployeeService.
 * It ensures that the EmployeeService is correctly instantiated.
 *
 * Features:
 * - Uses Angular's `TestBed` to configure the test environment.
 * - Verifies that the EmployeeService is successfully created.
 *
 * Dependencies:
 * - `TestBed`: Angular's testing utility for setting up test modules.
 * - `EmployeeService`: The service under test.
 */

import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  /**
   * Before each test, configure the testing module and inject the EmployeeService.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  /**
   * Test: Ensure the service is successfully created.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
