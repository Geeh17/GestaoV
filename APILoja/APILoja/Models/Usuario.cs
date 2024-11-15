using System.ComponentModel.DataAnnotations;

namespace APILoja.Models
{
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; } 

        [Required(ErrorMessage = "O nome de usuário é obrigatório.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "O nome de usuário deve ter entre 3 e 50 caracteres.")]
        public string UsuarioNome { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres.")]
        public string Senha { get; set; } = string.Empty;

        [Required(ErrorMessage = "O tipo de usuário é obrigatório.")]
        [StringLength(20, ErrorMessage = "A role não pode exceder 20 caracteres.")]
        public string Role { get; set; } = "User";
    }
}
