/**
 * Program.cs
 *
 * This file sets up and configures the Employee API.
 * It initializes essential services, middleware, and configurations.
 *
 * Features:
 * - Loads environment variables from a `.env` file.
 * - Configures a connection to a SQL Server database.
 * - Enables CORS to allow frontend communication.
 * - Sets up Swagger for API documentation.
 * - Defines middleware for request handling and security.
 *
 * Dependencies:
 * - `DotNetEnv`: Loads environment variables from a `.env` file.
 * - `Microsoft.EntityFrameworkCore`: Enables database interactions using EF Core.
 * - `Microsoft.OpenApi.Models`: Provides Swagger API documentation.
 *
 * Notes:
 * - The connection string is dynamically loaded and supports placeholders for environment variables.
 * - CORS is configured to allow requests from an Angular frontend (`http://localhost:4200`).
 */

using DotNetEnv;
using EmployeeApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

// Load environment variables from the .env file.
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Retrieve the connection string from appsettings.json, with placeholders replaced by environment variables.
string connectionString = builder.Configuration.GetConnectionString("EmployeeDbConnection")!;

// Configure CORS policy to allow frontend communication from Angular (http://localhost:4200).
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// Configure the database context using SQL Server.
builder.Services.AddDbContext<EmployeeDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add controllers for handling API requests.
builder.Services.AddControllers();

// Enable API endpoint exploration (required for minimal APIs).
builder.Services.AddEndpointsApiExplorer();

// Enable Swagger for API documentation.
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply CORS policy to the application.
app.UseCors("AllowAngular");

// Enable Swagger UI only in development mode.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable HTTPS redirection for security.
app.UseHttpsRedirection();

// Map controller routes to handle API requests.
app.MapControllers();

// Run the application.
app.Run();
