import React from "react";

function ListaUsuarios({ users, onEdit, onDelete }) {
  // Função para lidar com a edição
  const handleEdit = (user) => {
    if (!onEdit || typeof onEdit !== "function") {
      console.error("Função 'onEdit' não foi passada ou é inválida.");
      return;
    }
    onEdit(user); // Chama a função passada pelo componente pai
  };

  // Função para lidar com a exclusão
  const handleDelete = (userId) => {
    if (!onDelete || typeof onDelete !== "function") {
      console.error("Função 'onDelete' não foi passada ou é inválida.");
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      onDelete(userId); // Chama a função passada pelo componente pai
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Lista de Usuários
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Função</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.usuarioId}
                  className="text-gray-800 hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2 border text-center">
                    {user.usuarioId}
                  </td>
                  <td className="px-4 py-2 border">{user.usuarioNome}</td>
                  <td className="px-4 py-2 border text-center">{user.role}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 mr-2 rounded transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.usuarioId)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaUsuarios;
