/**
 * EmployeeDbContext.cs
 *
 * This file defines the database context for managing employee records.
 * It is responsible for interacting with the database using Entity Framework Core (EF Core).
 *
 * Features:
 * - Inherits from `DbContext` to provide database interaction capabilities.
 * - Defines a `DbSet<Employee>` for querying and saving employee data.
 * - Uses dependency injection to receive database options.
 *
 * Dependencies:
 * - `Microsoft.EntityFrameworkCore`: Provides EF Core functionality.
 * - `Employee`: The entity model representing an employee.
 *
 * Notes:
 * - The constructor receives `DbContextOptions<EmployeeDbContext>` to configure the database connection.
 * - `DbSet<Employee>` maps to a database table named `Employees`.
 */

using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Models
{
    /**
     * Represents the database context for the Employee API.
     * Manages database operations related to employees using EF Core.
     */
    public class EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : DbContext(options)
    {
        /**
         * Represents the Employees table in the database.
         * Provides querying, insertion, update, and deletion functionality for Employee records.
         */
        public DbSet<Employee> Employees { get; set; }
    }
}
