using APILoja.Context;
using APILoja.Models;
using Microsoft.EntityFrameworkCore;

namespace APILoja.ApiEndpoints
{
    public static class ProdutosEndpoints
    {
        public static void MapProdutosEndpoints(this WebApplication app)
        {
            // Adicionar Produto
            app.MapPost("/produtos", async (Produto produto, AppDbContext db) =>
            {
                if (string.IsNullOrWhiteSpace(produto.Nome) || produto.Preco <= 0 || produto.Estoque < 0)
                {
                    return Results.BadRequest("Erro: Nome, Preço e Estoque são obrigatórios e devem ter valores válidos.");
                }
                var categoria = await db.Categorias.FindAsync(produto.CategoriaId);
                if (categoria == null)
                {
                    return Results.BadRequest("Erro: A categoria especificada não existe.");
                }
                db.Produtos.Add(produto);
                await db.SaveChangesAsync();
                return Results.Created($"/produtos/{produto.ProdutoId}", produto);
            }).RequireAuthorization();

            // Listar Produtos com Paginação e Filtro por Categoria
            app.MapGet("/produtos", async (int? pageNumber, int? pageSize, int? categoriaId, AppDbContext db) =>
            {
                var query = db.Produtos.Include(p => p.Categoria).AsQueryable();
                if (categoriaId.HasValue)
                {
                    query = query.Where(p => p.CategoriaId == categoriaId.Value);
                }
                var page = pageNumber ?? 1;
                var size = pageSize ?? 10;
                query = query.Skip((page - 1) * size).Take(size);
                var produtos = await query
                    .Select(p => new
                    {
                        p.ProdutoId,
                        p.Nome,
                        p.Descricao,
                        p.Preco,
                        p.DataCompra,
                        p.Estoque,
                        CategoriaNome = p.Categoria != null ? p.Categoria.Nome : "Sem categoria"
                    })
                    .ToListAsync();
                return Results.Ok(produtos);
            }).RequireAuthorization();

            // Obter Produto por ID
            app.MapGet("/produtos/{id:int}", async (int id, AppDbContext db) =>
            {
                var produto = await db.Produtos
                    .Include(p => p.Categoria)
                    .Where(p => p.ProdutoId == id)
                    .Select(p => new
                    {
                        p.ProdutoId,
                        p.Nome,
                        p.Descricao,
                        p.Preco,
                        p.DataCompra,
                        p.Estoque,
                        CategoriaNome = p.Categoria != null ? p.Categoria.Nome : "Sem categoria"
                    })
                    .FirstOrDefaultAsync();
                return produto != null
                    ? Results.Ok(produto)
                    : Results.NotFound("Erro: Produto não encontrado.");
            }).RequireAuthorization();

            // Atualizar Produto
            app.MapPut("/produtos/{id:int}", async (int id, Produto produto, AppDbContext db) =>
            {
                if (produto.ProdutoId != id)
                {
                    return Results.BadRequest("Erro: O ID do produto na URL não corresponde ao ID do corpo da requisição.");
                }
                if (string.IsNullOrWhiteSpace(produto.Nome) || produto.Preco <= 0 || produto.Estoque < 0)
                {
                    return Results.BadRequest("Erro: Nome, Preço e Estoque são obrigatórios e devem ter valores válidos.");
                }
                var produtoDB = await db.Produtos.FindAsync(id);
                if (produtoDB == null)
                {
                    return Results.NotFound("Erro: Produto não encontrado para atualização.");
                }
                var categoria = await db.Categorias.FindAsync(produto.CategoriaId);
                if (categoria == null)
                {
                    return Results.BadRequest("Erro: A categoria especificada não existe.");
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

            // Deletar Produto
            app.MapDelete("/produtos/{id:int}", async (int id, AppDbContext db) =>
            {
                var produto = await db.Produtos.FindAsync(id);
                if (produto == null)
                {
                    return Results.NotFound("Erro: Produto não encontrado.");
                }
                db.Produtos.Remove(produto);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();
        }
    }
}
