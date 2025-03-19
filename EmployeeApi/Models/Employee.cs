/**
 * Employee.cs
 *
 * This file defines the Employee model, representing an employee entity in the system.
 * It is used for database operations and API data transfer.
 *
 * Features:
 * - Represents an employee with essential details such as Name, Role, Department, and Salary.
 * - Uses C#'s `required` keyword to enforce non-nullable properties.
 * - Serves as a model for Entity Framework Core and API responses.
 *
 * Dependencies:
 * - Used in `EmployeeDbContext` for database interactions.
 * - Used in `EmployeesController` for API request and response handling.
 */

namespace EmployeeApi.Models
{
    /**
     * Represents an employee entity with essential details.
     */
    public class Employee
    {
        /**
         * The unique identifier for an employee.
         */
        public int Id { get; set; }

        /**
         * The full name of the employee.
         * This field is required.
         */
        public required string Name { get; set; }

        /**
         * The role or job title of the employee.
         * This field is required.
         */
        public required string Role { get; set; }

        /**
         * The department where the employee works.
         * This field is required.
         */
        public required string Department { get; set; }

        /**
         * The salary of the employee.
         * Stored as a decimal to accommodate financial calculations.
         */
        public decimal Salary { get; set; }
    }
}
