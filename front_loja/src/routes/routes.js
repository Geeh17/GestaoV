import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FormularioCategoria from "../components/formularios/FormularioCategoria";
import ListaCategorias from "../components/formularios/ListaCategorias";
import FormularioProduto from "../components/formularios/FormularioProduto";
import ListaProdutos from "../components/formularios/ListaProdutos";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Painel from "../pages/Painel";
import Home from "../pages/Home";
import AdminSettings from "../pages/AdminSettings";

const AppRoutes = ({ isAuthenticated, onLogin }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={onLogin} />
          )
        }
      />
      <Route path="/register" element={<Cadastro />} />

      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Painel />} />
          <Route path="/categorias/nova" element={<FormularioCategoria />} />
          <Route path="/categorias" element={<ListaCategorias />} />
          <Route path="/produtos/novo" element={<FormularioProduto />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
