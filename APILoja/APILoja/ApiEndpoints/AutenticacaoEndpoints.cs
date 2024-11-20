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
            // Realizar login de usuário
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
                        usuario);
                    return Results.Ok(new { token = tokenString });
                }
                return Results.BadRequest("Erro: Credenciais inválidas.");
            })
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status200OK)
            .WithName("Login")
            .WithTags("Autenticacao");

            // Registrar novo usuário
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
                if (string.IsNullOrWhiteSpace(userModel.Role) || (userModel.Role != "User" && userModel.Role != "ADM"))
                {
                    userModel.Role = "User";
                }
                db.Usuarios.Add(userModel);
                await db.SaveChangesAsync();
                return Results.Created($"/usuarios/{userModel.UsuarioNome}", userModel);
            })
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status201Created)
            .WithName("Register")
            .WithTags("Autenticacao");

            // Obter detalhes do usuário logado
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

            // Listar todos os usuários (admin)
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

            // Deletar usuário (admin)
            app.MapDelete("/admin/users/{id}", [Authorize(Roles = "ADM")] async (int id, AppDbContext db) =>
            {
                var usuario = await db.Usuarios.FindAsync(id);
                if (usuario == null)
                {
                    return Results.NotFound("Usuário não encontrado.");
                }
                db.Usuarios.Remove(usuario);
                await db.SaveChangesAsync();
                return Results.Ok("Usuário deletado com sucesso.");
            })
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status200OK)
            .WithName("DeleteUser")
            .WithTags("Admin");

            // Atualizar usuário (admin)
            app.MapPut("/admin/users/{id}", [Authorize(Roles = "ADM")] async (int id, Usuario userModel, AppDbContext db) =>
            {
                var usuario = await db.Usuarios.FindAsync(id);
                if (usuario == null)
                {
                    return Results.NotFound("Usuário não encontrado.");
                }
                if (string.IsNullOrEmpty(userModel.UsuarioNome) || string.IsNullOrEmpty(userModel.Senha))
                {
                    return Results.BadRequest("Erro: Nome de usuário e senha são obrigatórios.");
                }
                if (userModel.Senha.Length < 6)
                {
                    return Results.BadRequest("Erro: A senha deve ter pelo menos 6 caracteres.");
                }
                var existingUser = await db.Usuarios
                    .AnyAsync(u => u.UsuarioNome == userModel.UsuarioNome && u.UsuarioId != id);
                if (existingUser)
                {
                    return Results.BadRequest("Erro: Nome de usuário já está em uso por outro usuário.");
                }
                usuario.UsuarioNome = userModel.UsuarioNome;
                usuario.Senha = userModel.Senha;
                usuario.Role = userModel.Role;
                db.Usuarios.Update(usuario);
                await db.SaveChangesAsync();
                return Results.Ok("Usuário atualizado com sucesso.");
            })
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status200OK)
            .WithName("UpdateUser")
            .WithTags("Admin");

            // Obter detalhes de um usuário específico (admin)
            app.MapGet("/admin/users/{id}", [Authorize(Roles = "ADM")] async (int id, AppDbContext db) =>
            {
                var usuario = await db.Usuarios.FindAsync(id);
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
            .Produces(StatusCodes.Status404NotFound)
            .Produces(StatusCodes.Status200OK)
            .WithName("GetUserById")
            .WithTags("Admin");
        }
    }
}
