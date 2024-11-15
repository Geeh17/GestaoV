using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace APILoja.Models
{
    public class Categoria
    {
        public int CategoriaId { get; set; }

        [Required(ErrorMessage = "O nome da categoria é obrigatório.")]
        [StringLength(50, ErrorMessage = "O nome da categoria não pode exceder 50 caracteres.")]
        public string? Nome { get; set; }

        [StringLength(150, ErrorMessage = "A descrição não pode exceder 150 caracteres.")]
        public string? Descricao { get; set; }
        [JsonIgnore]
        public ICollection<Produto>? Produtos { get; set; }
    }
}
