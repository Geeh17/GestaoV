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

                var usuario = await db.Usuarios
                    .FirstOrDefaultAsync(u => u.UsuarioNome == userModel.UsuarioNome && u.Senha == userModel.Senha);

                if (usuario != null)
                {
                    var tokenString = tokenService.GerarToken(app.Configuration["Jwt:Key"],
                        app.Configuration["Jwt:Issuer"],
                        app.Configuration["Jwt:Audience"],
                        usuario); // Passa o usuário completo, incluindo a role
                    return Results.Ok(new { token = tokenString });
                }

                return Results.BadRequest("Erro: Credenciais inválidas.");
            })
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status200OK)
            .WithName("Login")
            .WithTags("Autenticacao");

            app.MapPost("/register", [AllowAnonymous] async (Usuario userModel, AppDbContext db) =>
            {
                if (userModel == null || string.IsNullOrEmpty(userModel.UsuarioNome) || string.IsNullOrEmpty(userModel.Senha))
                {
                    return Results.BadRequest("Erro: Nome de usuário e senha são obrigatórios.");
                }

                if (userModel.Senha.Length < 6)
                {
                    return Results.BadRequest("Erro: A senha deve ter pelo menos 6 caracteres.");
                }

                var existingUser = await db.Usuarios
                    .AnyAsync(u => u.UsuarioNome == userModel.UsuarioNome);

                if (existingUser)
                {
                    return Results.BadRequest("Erro: Nome de usuário já está em uso.");
                }

                userModel.Role = "User"; 
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
