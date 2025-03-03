using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Models
{
    public class EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : DbContext(options)
    {
        public DbSet<Employee> Employees { get; set; }
    }
}
