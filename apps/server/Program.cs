using Atelier.Core.Interfaces;
using Atelier.Core.Services;
using Atelier.Infrastructure.Extensions;
using Atelier.Infrastructure.Repositories;
using Atelier.Server;
using FastEndpoints;
using FastEndpoints.Security;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IMongoClient>(_ => new MongoClient("mongodb://localhost:27017"));
builder.Services.AddScoped<IMongoDatabase>(sp => sp.GetRequiredService<IMongoClient>().GetDatabase("atelier"));
builder.Services.AddSingleton<ICollectionNameProvider, CollectionNameProvider>();
builder.Services.AddSingleton<IIdGenerator<string>, MongoObjectIdGenerator>();
builder.Services.AddScoped(typeof(IEntityRepository<,>), typeof(EntityRepository<,>));
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services
    .AddAuthenticationJwtBearer(s => s.SigningKey = "SecretKey")
    .AddAuthorization()
    .AddFastEndpoints();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseAuthentication()
    .UseAuthentication()
    .UseFastEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.MapScalarUi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.Run();
