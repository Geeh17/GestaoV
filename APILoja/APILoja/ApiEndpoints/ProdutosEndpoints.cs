using APILoja.Context;
using APILoja.Models;
using Microsoft.EntityFrameworkCore;

namespace APILoja.ApiEndpoints
{
    public static class ProdutosEndpoints
    {
        public static void MapProdutosEndpoints(this WebApplication app)
        {
            app.MapPost("/produtos", async (Produto produto, AppDbContext db) => {
                db.Produtos.Add(produto);
                await db.SaveChangesAsync();
                return Results.Created($"/produtos/{produto.ProdutoId}", produto);
            }).RequireAuthorization("AdminOnly");

            app.MapGet("/produtos", async (int pageNumber, int pageSize, AppDbContext db) => {
                pageNumber = pageNumber < 1 ? 1 : pageNumber;
                pageSize = pageSize < 1 ? 10 : pageSize;

                var produtos = await db.Produtos
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Results.Ok(produtos);
            }).RequireAuthorization();

            app.MapGet("/produtos/{id:int}", async (int id, AppDbContext db) => {
                var produto = await db.Produtos.FindAsync(id);
                return produto != null
                    ? Results.Ok(produto)
                    : Results.NotFound("Produto não encontrado.");
            }).RequireAuthorization();

            app.MapPut("/produtos/{id:int}", async (int id, Produto produto, AppDbContext db) => {
                if (produto.ProdutoId != id)
                {
                    return Results.BadRequest("Erro: O ID do produto na URL não corresponde ao ID do corpo da requisição.");
                }

                var produtoDB = await db.Produtos.FindAsync(id);
                if (produtoDB is null)
                {
                    return Results.NotFound("Erro: Produto não encontrado para atualização.");
                }

                produtoDB.Nome = produto.Nome;
                produtoDB.Descricao = produto.Descricao;
                produtoDB.Preco = produto.Preco;
                produtoDB.DataCompra = produto.DataCompra;
                produtoDB.Estoque = produto.Estoque;
                produtoDB.CategoriaId = produto.CategoriaId;

                await db.SaveChangesAsync();
                return Results.Ok(produtoDB);
            }).RequireAuthorization();

            app.MapDelete("/produtos/{id:int}", async (int id, AppDbContext db) => {
                var produto = await db.Produtos.FindAsync(id);
                if (produto is null)
                {
                    return Results.NotFound("Produto não encontrado.");
                }

                db.Produtos.Remove(produto);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization("AdminOnly");
        }
    }
}
