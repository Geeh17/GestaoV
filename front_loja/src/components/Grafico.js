import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Grafico() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5238/categorias', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const categorias = await response.json();

        const labels = categorias.map((categoria) => categoria.nome);
        const dataCount = categorias.map((categoria) => categoria.produtoCount || 0);

        setData({
          labels,
          datasets: [
            {
              label: 'Produtos por Categoria',
              data: dataCount,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Produtos por Categoria</h2>
      <Bar data={data} />
    </div>
  );
}

export default Grafico;
