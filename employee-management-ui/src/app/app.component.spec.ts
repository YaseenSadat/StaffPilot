/**
 * app.component.spec.ts
 *
 * This file contains unit tests for the AppComponent.
 * It verifies that the application initializes correctly and renders as expected.
 *
 * Features:
 * - Ensures the root component is created successfully.
 * - Checks that the application title is correctly set.
 * - Validates that the title is displayed on the UI.
 *
 * Dependencies:
 * - `TestBed`: Configures and initializes the Angular testing environment.
 * - `AppComponent`: The root component of the application.
 */

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  /**
   * Before each test, configure the testing module and compile the components.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Import the root component for testing
    }).compileComponents();
  });

  /**
   * Test: Ensure the AppComponent is successfully created.
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Test: Check if the title property is correctly set.
   */
  it(`should have the 'employee-management-ui' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('employee-management-ui');
  });

  /**
   * Test: Verify that the title is rendered in the HTML.
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, employee-management-ui');
  });
});
