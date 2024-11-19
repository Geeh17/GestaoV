import React, { useEffect, useState } from "react";
import UsuarioFormulario from "./UsuarioFormulario";
import ListaUsuarios from "./ListaUsuarios";

function AdminSettings() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ UsuarioNome: "", Role: "User", Senha: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5238/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Erro ao buscar usuários:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleCreateOrUpdateUser = async () => {
    const token = localStorage.getItem("token");
    const method = currentUser.UsuarioId ? "PUT" : "POST";
    const url = currentUser.UsuarioId
      ? `http://localhost:5238/admin/users/${currentUser.UsuarioId}`
      : "http://localhost:5238/register";
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentUser),
      });
      if (response.ok) {
        fetchUsers();
        setCurrentUser({ UsuarioNome: "", Role: "User", Senha: "" });
        setIsEditModalOpen(false);
      } else {
        console.error("Erro ao salvar usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5238/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Erro ao excluir usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciamento de Usuários</h1>
      <UsuarioFormulario
        user={currentUser}
        onChange={setCurrentUser}
        onSave={handleCreateOrUpdateUser}
        onCancel={() => setCurrentUser({ UsuarioNome: "", Role: "User", Senha: "" })}
      />
      <ListaUsuarios
        users={users}
        onEdit={(user) => {
          setCurrentUser(user);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default AdminSettings;
