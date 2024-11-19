import React, { useEffect, useState } from "react";
import UsuarioFormulario from "./UsuarioFormulario";
import ListaUsuarios from "./ListaUsuarios";

function AdminSettings() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    UsuarioId: null,
    UsuarioNome: "",
    Role: "User",
    Senha: "",
  });
  const [error, setError] = useState(null);

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
    console.log("Dados do usuário sendo enviados:", currentUser);

    if (!currentUser.UsuarioNome || !currentUser.Senha || currentUser.Senha.length < 6) {
      setError("O nome do usuário e a senha são obrigatórios (mínimo de 6 caracteres).");
      return;
    }
    setError(null); 

    const token = localStorage.getItem("token");
    const isUpdating = !!currentUser.UsuarioId; 
    const method = isUpdating ? "PUT" : "POST";
    const url = isUpdating
      ? `http://localhost:5238/admin/users/${currentUser.UsuarioId}` 
      : "http://localhost:5238/register"; 

    console.log(`Usando o método ${method} no endpoint ${url}`); 
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          UsuarioNome: currentUser.UsuarioNome,
          Senha: currentUser.Senha,
          Role: currentUser.Role,
        }),
      });

      if (response.ok) {
        alert(isUpdating ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!");
        fetchUsers(); 
        setCurrentUser({ UsuarioId: null, UsuarioNome: "", Role: "User", Senha: "" }); 
      } else {
        const errorMessage = await response.text();
        setError(`Erro ao salvar usuário: ${errorMessage}`);
      }
    } catch (error) {
      setError("Erro ao salvar usuário. Verifique o console.");
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
        alert("Usuário excluído com sucesso!");
        fetchUsers(); 
      } else {
        const errorMessage = await response.text();
        setError(`Erro ao excluir usuário: ${errorMessage}`);
      }
    } catch (error) {
      setError("Erro ao excluir usuário. Verifique o console.");
      console.error("Erro ao excluir usuário:", error);
    }
  };
  const fetchUserById = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5238/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user); 
      } else {
        console.error("Erro ao buscar usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciamento de Usuários</h1>
      {error && <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>}
      <UsuarioFormulario
        user={currentUser}
        onChange={setCurrentUser}
        onSave={handleCreateOrUpdateUser}
        onCancel={() => {
          setCurrentUser({ UsuarioId: null, UsuarioNome: "", Role: "User", Senha: "" });
          setError(null);
        }}
      />
      <ListaUsuarios
        users={users}
        onEdit={(user) => {
          console.log("Usuário selecionado para edição:", user); 
          setCurrentUser(user); 
          setError(null);
        }}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default AdminSettings;
