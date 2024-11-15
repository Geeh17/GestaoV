using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APILoja.Migrations
{
    /// <inheritdoc />
    public partial class AtualizaModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TempUsuarios",
                columns: table => new
                {
                    UsuarioId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsuarioNome = table.Column<string>(maxLength: 50, nullable: false),
                    Senha = table.Column<string>(maxLength: 100, nullable: false),
                    Role = table.Column<string>(maxLength: 20, nullable: false)
                });

            migrationBuilder.Sql("INSERT INTO TempUsuarios (UsuarioNome, Senha, Role) SELECT UsuarioNome, Senha, Role FROM Usuarios");

            migrationBuilder.DropTable(name: "Usuarios");

            migrationBuilder.RenameTable(name: "TempUsuarios", newName: "Usuarios");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    UsuarioNome = table.Column<string>(maxLength: 50, nullable: false),
                    Senha = table.Column<string>(nullable: false),
                    Role = table.Column<string>(maxLength: 20, nullable: false),
                    UsuarioId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.UsuarioNome);
                });

            migrationBuilder.Sql("INSERT INTO Usuarios (UsuarioNome, Senha, Role) SELECT UsuarioNome, Senha, Role FROM TempUsuarios");

            migrationBuilder.DropTable(name: "TempUsuarios");
        }
    }
}
