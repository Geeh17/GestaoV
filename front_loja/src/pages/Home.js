import React, { useState, useEffect, useCallback } from 'react';

function Home() {
  const [metrics, setMetrics] = useState({
    categories: 0,
    products: 0,
    reports: 0,
  });
  const [loading, setLoading] = useState(true); 

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token');

      const categoriasResponse = await fetch('http://localhost:5238/categorias', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!categoriasResponse.ok) {
        throw new Error(`Erro ao buscar categorias: ${categoriasResponse.statusText}`);
      }

      const categorias = await categoriasResponse.json();
      const categoriesCount = categorias.length;
      console.log('Categorias retornadas pela API:', categorias);

      const produtosResponse = await fetch('http://localhost:5238/produtos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!produtosResponse.ok) {
        throw new Error(`Erro ao buscar produtos: ${produtosResponse.statusText}`);
      }

      const produtos = await produtosResponse.json();
      const productsCount = produtos.length;
      console.log('Produtos retornados pela API:', produtos);

      const reportsCount = 1;

      setMetrics({
        categories: categoriesCount,
        products: productsCount,
        reports: reportsCount,
      });
    } catch (error) {
      console.error('Erro ao carregar métricas:', error);
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-bold text-gray-700">Carregando métricas...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">Bem-vindo à loja Gestão V</h1>
        <p className="text-lg font-bold text-gray-600 mb-8">
          Utilize o menu lateral para navegar entre as funcionalidades do sistema.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center justify-center bg-blue-100 p-6 rounded-lg shadow-md">
            <span className="text-3xl font-bold text-blue-700">{metrics.categories}</span>
            <span className="text-blue-800 font-medium">Categorias</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-green-100 p-6 rounded-lg shadow-md">
            <span className="text-3xl font-bold text-green-700">{metrics.products}</span>
            <span className="text-green-800 font-medium">Produtos</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-orange-100 p-6 rounded-lg shadow-md">
            <span className="text-3xl font-bold text-orange-700">{metrics.reports}</span>
            <span className="text-orange-800 font-medium">Relatórios</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
