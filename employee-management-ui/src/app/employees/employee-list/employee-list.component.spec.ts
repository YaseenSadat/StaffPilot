/**
 * employee-list.component.spec.ts
 * 
 * Unit test file for the EmployeeListComponent using Angular's testing framework.
 * It verifies that the component initializes correctly.
 * 
 * Features:
 * - Configures a test module with the EmployeeListComponent.
 * - Ensures that the component is created successfully.
 * 
 * Dependencies:
 * - `TestBed`: Angular's utility for configuring and initializing test environments.
 * - `ComponentFixture`: Provides access to the component instance and debugging utilities.
 * - `EmployeeListComponent`: The component under test.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  /**
   * Before each test, configure the testing module and compile components.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent] // Import the component being tested
    })
    .compileComponents(); // Compile template and styles

    // Create a test instance of EmployeeListComponent
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  /**
   * Test: Ensure the component is successfully created.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
