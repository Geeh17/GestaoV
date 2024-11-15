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

            // Endpoint de Registro
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

            app.MapGet("/users/details", [Authorize] async (HttpContext httpContext, AppDbContext db) =>
            {
                var userName = httpContext.User.Identity?.Name;

                if (string.IsNullOrEmpty(userName))
                {
                    return Results.Unauthorized();
                }

                var usuario = await db.Usuarios.FirstOrDefaultAsync(u => u.UsuarioNome == userName);

                if (usuario == null)
                {
                    return Results.NotFound("Usuário não encontrado.");
                }

                return Results.Ok(new
                {
                    UsuarioId = usuario.UsuarioId,
                    UsuarioNome = usuario.UsuarioNome,
                    Role = usuario.Role
                });
            })
            .Produces(StatusCodes.Status401Unauthorized)
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status200OK)
            .WithName("GetUserDetails")
            .WithTags("Autenticacao");

            app.MapGet("/admin/users", [Authorize(Roles = "ADM")] async (AppDbContext db) =>
            {
                var usuarios = await db.Usuarios.Select(u => new
                {
                    UsuarioId = u.UsuarioId,
                    UsuarioNome = u.UsuarioNome,
                    Role = u.Role
                }).ToListAsync();

                return Results.Ok(usuarios);
            })
            .Produces(StatusCodes.Status403Forbidden)
            .Produces(StatusCodes.Status200OK)
            .WithName("GetAllUsers")
            .WithTags("Admin");

        }

    }
}
