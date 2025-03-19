/**
 * EmployeesController.cs
 *
 * This API controller handles CRUD operations for managing employees.
 * It interacts with the database via Entity Framework Core.
 *
 * Features:
 * - Retrieves all employees (`GET /api/Employees`).
 * - Fetches a specific employee by ID (`GET /api/Employees/{id}`).
 * - Adds a new employee (`POST /api/Employees`).
 * - Updates an existing employee (`PUT /api/Employees/{id}`).
 * - Deletes an employee (`DELETE /api/Employees/{id}`).
 *
 * Dependencies:
 * - `Microsoft.AspNetCore.Mvc`: Provides base classes for API controllers.
 * - `Microsoft.EntityFrameworkCore`: Enables database interactions using Entity Framework Core.
 * - `EmployeeApi.Models`: Contains the `Employee` model.
 *
 * Notes:
 * - Uses async methods for database operations to ensure non-blocking execution.
 * - Handles potential errors, such as record not found and concurrency issues.
 */

using EmployeeApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeApi.Controllers
{
    [Route("api/[controller]")] // Defines route as /api/Employees
    [ApiController] // Specifies that this is a REST API controller
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        /**
         * Constructor to initialize the database context.
         * 
         * @param context The database context used for employee operations.
         */
        public EmployeesController(EmployeeDbContext context)
        {
            _context = context;
        }

        /**
         * Retrieves a list of all employees.
         * 
         * @return List of all employees.
         * @response 200 OK - Returns the list of employees.
         */
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        /**
         * Retrieves a single employee by ID.
         * 
         * @param id The unique identifier of the employee.
         * @return The employee object if found, otherwise 404 Not Found.
         * @response 200 OK - Employee found and returned.
         * @response 404 Not Found - Employee does not exist.
         */
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        /**
         * Creates a new employee record.
         * 
         * @param employee The employee object to be added.
         * @return The created employee with a reference URL.
         * @response 201 Created - Employee successfully created.
         */
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        /**
         * Updates an existing employee record.
         * 
         * @param id The unique identifier of the employee.
         * @param employee The updated employee object.
         * @return No content if update is successful, or an appropriate error response.
         * @response 204 No Content - Employee successfully updated.
         * @response 400 Bad Request - Provided ID does not match employee ID.
         * @response 404 Not Found - Employee does not exist.
         */
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Employees.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /**
         * Deletes an employee record.
         * 
         * @param id The unique identifier of the employee to be deleted.
         * @return No content if deletion is successful, or 404 if not found.
         * @response 204 No Content - Employee successfully deleted.
         * @response 404 Not Found - Employee does not exist.
         */
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
