using DotNetEnv;
using EmployeeApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

// Load environment variables from .env file
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Now, when you retrieve the connection string from appsettings.json, 
// the placeholder ${DB_PASSWORD} will be replaced by the value from the environment variable.
string connectionString = builder.Configuration.GetConnectionString("EmployeeDbConnection")!;

// ... rest of your code ...
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddDbContext<EmployeeDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAngular");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
