import React, { useEffect, useState } from 'react';
import Cartao from '../components/Cartao';
import Grafico from '../components/Grafico';
import api from '../services/api';

function Painel() {
  const [dados, setDados] = useState({
    ganhos: 0,
    credito: 0,
    faturas: 0,
    agentes: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Dashboard</h1>
      <p>Aqui você verá as informações principais do sistema.</p>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Cartao titulo="Ganhos" valor={dados.ganhos} cor="bg-blue-500" />
        <Cartao titulo="Crédito" valor={dados.credito} cor="bg-green-500" />
        <Cartao titulo="Faturas" valor={dados.faturas} cor="bg-purple-500" />
        <Cartao titulo="Agentes" valor={dados.agentes} cor="bg-teal-500" />
      </div>
      
      <div className="mt-8">
        <Grafico />
      </div>
    </div>
  );
}

export default Painel;
