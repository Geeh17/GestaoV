import React, { useState } from "react";
import UsuarioFormulario from "./UsuarioFormulario";

function ListaUsuarios({ users, onEdit, onDelete }) {
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    if (!user || !user.usuarioId) {
      console.error("Erro: Usuário inválido selecionado para edição:", user);
      return;
    }
    console.log("Usuário selecionado para edição:", user);
    setEditingUser(user); 
  };

  const handleSave = (updatedUser) => {
    if (!updatedUser || !updatedUser.usuarioId) {
      console.error("Erro: Usuário inválido ao salvar:", updatedUser);
      return;
    }
    console.log("Salvando alterações do usuário:", updatedUser);
    onEdit(updatedUser); 
    setEditingUser(null); 
  };

  const handleCancel = () => {
    console.log("Edição cancelada.");
    setEditingUser(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Lista de Usuários
      </h2>

      {editingUser ? (
        <UsuarioFormulario
          user={editingUser}
          onChange={(updatedUser) => setEditingUser(updatedUser)}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
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
                        onClick={() => onDelete(user.usuarioId)}
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
      )}
    </div>
  );
}

export default ListaUsuarios;
