import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RotaProtegida from './components/RotaProtegida';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Produtos from './pages/Produtos';
import Categorias from './pages/Categorias';
import Perfil from './pages/Perfil';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas para todos os usuários autenticados */}
        <Route 
          path="/dashboard" 
          element={
            <RotaProtegida>
              <Dashboard />
            </RotaProtegida>
          } 
        />
        <Route 
          path="/perfil" 
          element={
            <RotaProtegida>
              <Perfil />
            </RotaProtegida>
          } 
        />

        {/* Rotas protegidas apenas para usuários com a role "ADM" */}
        <Route 
          path="/produtos" 
          element={
            <RotaProtegida requiredRole="ADM">
              <Produtos />
            </RotaProtegida>
          } 
        />
        <Route 
          path="/categorias" 
          element={
            <RotaProtegida requiredRole="ADM">
              <Categorias />
            </RotaProtegida>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
