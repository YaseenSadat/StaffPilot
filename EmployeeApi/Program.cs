using EmployeeApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);

// Retrieve the connection string from appsettings.json
string connectionString = builder.Configuration.GetConnectionString("EmployeeDbConnection")!;

// Register the EmployeeDbContext with SQL Server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddDbContext<EmployeeDbContext>(options =>
    options.UseSqlServer(connectionString));

// Register controllers and Swagger/OpenAPI services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable CORS using the policy defined above
app.UseCors("AllowAngular");
// Configure the HTTP request pipeline for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Map controller endpoints (this will include your Employee endpoints)
app.MapControllers();

app.Run();
