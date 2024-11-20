using APILoja.AppServicesExtensions;
using APILoja.ApiEndpoints;
using APILoja.Services;
using APILoja.ApiEndpointslogin;

var builder = WebApplication.CreateBuilder(args);
builder.AddApiSwagger();
builder.AddPersistence();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
builder.Services.AddScoped<ITokenService, TokenService>();
builder.AddAutenticationJwt();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireClaim("Role", "Admin")); 

    options.AddPolicy("UserOnly", policy =>
        policy.RequireClaim("Role", "User"));

    options.AddPolicy("AdminOrUser", policy =>
        policy.RequireAssertion(context =>
            context.User.HasClaim("Role", "Admin") || context.User.HasClaim("Role", "User"))); 
});

var app = builder.Build();

app.MapAutenticacaoEndpoints();
app.MapCategoriasEndpoints();
app.MapProdutosEndpoints();

var environment = app.Environment;
app.UseExceptionHandling(environment).UseSwaggerMiddleware();

app.UseCors("AllowAll");
app.UseAuthentication(); 
app.UseAuthorization(); 
app.Run();
