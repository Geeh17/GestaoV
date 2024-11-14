using APILoja.Models;
using APILoja.Services;
using Microsoft.AspNetCore.Authorization;
using APILoja.Context;
using Microsoft.EntityFrameworkCore;

namespace APILoja.ApiEndpointslogin
{
    public static class AutenticacaoEndpoints
    {
        public static void MapAutenticacaoEndpoints(this WebApplication app)
        {
            // Endpoint de Login
            app.MapPost("/login", [AllowAnonymous] async (Usuario userModel, ITokenService tokenService, AppDbContext db) =>
            {
                if (userModel == null)
                {
                    return Results.BadRequest("Erro: Os dados de login não foram fornecidos.");
                }

                // Verificar se o usuário existe com nome e senha correspondentes
                var usuario = await db.Usuarios
                    .FirstOrDefaultAsync(u => u.UsuarioNome == userModel.UsuarioNome && u.Senha == userModel.Senha);

                if (usuario != null)
                {
                    var tokenString = tokenService.GerarToken(app.Configuration["Jwt:Key"],
                        app.Configuration["Jwt:Issuer"],
                        app.Configuration["Jwt:Audience"],
                        userModel);
                    return Results.Ok(new { token = tokenString });
                }

                return Results.BadRequest("Erro: Nome de usuário ou senha incorretos.");
            })
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status200OK)
            .WithName("Login")
            .WithTags("Autenticacao");

            // Endpoint de Registro
            app.MapPost("/register", [AllowAnonymous] async (Usuario userModel, AppDbContext db) =>
            {
                if (userModel == null || string.IsNullOrEmpty(userModel.UsuarioNome) || string.IsNullOrEmpty(userModel.Senha))
                {
                    return Results.BadRequest("Erro: Nome de usuário e senha são obrigatórios.");
                }

                // Verificar se o usuário já existe pelo nome
                var existingUser = await db.Usuarios
                    .AnyAsync(u => u.UsuarioNome == userModel.UsuarioNome);

                if (existingUser)
                {
                    return Results.BadRequest("Erro: Nome de usuário já está em uso.");
                }

                // Adicionar novo usuário ao banco de dados
                db.Usuarios.Add(userModel);
                await db.SaveChangesAsync();

                return Results.Created($"/usuarios/{userModel.UsuarioNome}", userModel);
            })
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status201Created)
            .WithName("Register")
            .WithTags("Autenticacao");
        }
    }
}
