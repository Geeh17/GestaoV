import React from "react";

function ListaUsuarios({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Função</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.usuarioId}> 
              <td className="border px-4 py-2">{user.usuarioId}</td>
              <td className="border px-4 py-2">{user.usuarioNome}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 mr-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(user.usuarioId)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuarios;
