using APILoja.Models;
using Microsoft.EntityFrameworkCore;

namespace APILoja.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Produto>? Produtos { get; set; }
        public DbSet<Categoria>? Categorias { get; set; }
        public DbSet<Usuario>? Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<Categoria>().HasKey(c => c.CategoriaId);
            mb.Entity<Categoria>().Property(c => c.Nome)
                .HasMaxLength(50) 
                .IsRequired();
            mb.Entity<Categoria>().Property(c => c.Descricao)
                .HasMaxLength(150);

            mb.Entity<Produto>().HasKey(p => p.ProdutoId);
            mb.Entity<Produto>().Property(p => p.Nome)
                .HasMaxLength(100)
                .IsRequired();
            mb.Entity<Produto>().Property(p => p.Descricao)
                .HasMaxLength(250);
            mb.Entity<Produto>().Property(p => p.Preco)
                .HasPrecision(14, 2)
                .IsRequired();
            mb.Entity<Produto>().Property(p => p.DataCompra)
                .IsRequired();
            mb.Entity<Produto>().Property(p => p.Estoque)
                .IsRequired();

            mb.Entity<Produto>()
                .HasOne(p => p.Categoria)
                .WithMany(c => c.Produtos)
                .HasForeignKey(p => p.CategoriaId)
                .OnDelete(DeleteBehavior.Cascade);

            mb.Entity<Usuario>().HasKey(u => u.UsuarioId);
            mb.Entity<Usuario>().Property(u => u.UsuarioId)
                .ValueGeneratedOnAdd();
            mb.Entity<Usuario>().Property(u => u.UsuarioNome)
                .HasMaxLength(50)
                .IsRequired();
            mb.Entity<Usuario>().Property(u => u.Senha)
                .HasMaxLength(100)
                .IsRequired();
            mb.Entity<Usuario>().Property(u => u.Role)
                .HasMaxLength(20)
                .IsRequired();

            mb.Entity<Categoria>()
                .HasIndex(c => c.Nome)
                .IsUnique(); 
        }
    }
}
