using APILoja.Models;

namespace APILoja.Services
{
    public interface ITokenService
    {
        String GerarToken(string key, string issuer, string audience, Usuario user);
    }
}
