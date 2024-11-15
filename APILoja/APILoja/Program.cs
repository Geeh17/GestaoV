using APILoja.AppServicesExtensions;
using APILoja.ApiEndpoints;
using APILoja.AppServicesExtensions;
using APILoja.Services;
using APILoja.ApiEndpointslogin;

var builder = WebApplication.CreateBuilder(args);

builder.AddApiSwagger();
builder.AddPersistence();
builder.Services.AddCors();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.AddAutenticationJwt();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Role", "Admin"));
    options.AddPolicy("UserOnly", policy => policy.RequireClaim("Role", "User"));
});

var app = builder.Build();

app.MapAutenticacaoEndpoints();
Console.WriteLine("Registrando o endpoint /users/details");

app.MapCategoriasEndpoints();
app.MapProdutosEndpoints();

var environment = app.Environment;
app.UseExceptionHandling(environment)
    .UseSwaggerMiddleware()
    .UseAppCors();

app.UseAuthentication();
app.UseAuthorization();

app.Run();