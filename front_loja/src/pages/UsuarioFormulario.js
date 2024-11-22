import React from "react";

function UsuarioFormulario({ user, onChange, onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(user); // Passa o objeto `user` para o `onSave`
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded mb-6">
      <h2 className="text-xl font-bold mb-4">Adicionar/Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="UsuarioNome" className="block font-bold mb-1">
            Nome do usuário
          </label>
          <input
            type="text"
            id="UsuarioNome"
            name="UsuarioNome"
            value={user.UsuarioNome || ""}
            onChange={(e) => onChange({ ...user, UsuarioNome: e.target.value })}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Senha" className="block font-bold mb-1">
            Senha
          </label>
          <input
            type="password"
            id="Senha"
            name="Senha"
            value={user.Senha || ""}
            onChange={(e) => onChange({ ...user, Senha: e.target.value })}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Role" className="block font-bold mb-1">
            Função
          </label>
          <select
            id="Role"
            name="Role"
            value={user.Role || "User"}
            onChange={(e) => onChange({ ...user, Role: e.target.value })}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="User">Usuário</option>
            <option value="ADM">Administrador</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UsuarioFormulario;
