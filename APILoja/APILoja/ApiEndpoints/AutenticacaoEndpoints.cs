using APILoja.Models;
using APILoja.Services;
using Microsoft.AspNetCore.Authorization;

namespace APILoja.ApiEndpoints
{
    public  static class AutenticacaoEndpoints
    {
        public static void MapAutenticacaoEndpoints(this WebApplication app)
        {
            app.MapPost("/login", [AllowAnonymous] (Usuario userModel, ITokenService tokenService) =>
            {
                if (userModel == null)
                {
                    return Results.BadRequest("Login Inválido");
                }
                if (userModel.UsuarioNome == "Geraldo" && userModel.Senha == "trabalhoVianna")
                {
                    var tokenString = tokenService.GerarToken(app.Configuration["Jwt:Key"],
                        app.Configuration["Jwt:Issuer"],
                        app.Configuration["Jwt:Audience"],
                        userModel);
                    return Results.Ok(new { token = tokenString });
                }
                else
                {
                    return Results.BadRequest("Login Inválido");
                }
            }).Produces(StatusCodes.Status400BadRequest)
                          .Produces(StatusCodes.Status200OK)
                          .WithName("Login")
                          .WithTags("Autenticacao");
        }

    }
}
