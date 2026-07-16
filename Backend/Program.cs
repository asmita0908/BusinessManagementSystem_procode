using Backend.Models;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// CORS Policy Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy => 
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// Configure MongoDB Settings options mapping
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));

// Register IMongoClient
builder.Services.AddSingleton<IMongoClient>(sp => 
    new MongoClient(builder.Configuration.GetValue<string>("MongoDbSettings:ConnectionString")));

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();
app.Run();