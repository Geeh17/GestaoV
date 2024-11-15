import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Grafico() {
  const data = {
    labels: ['Maio', 'Junho', 'Julho', 'Agosto'],
    datasets: [
      {
        label: 'Vendas',
        data: [1000, 750, 500, 250],
        fill: true,
        backgroundColor: 'rgba(66, 153, 225, 0.5)',
        borderColor: '#4299E1',
      },
    ],
  };

  return <Line data={data} />;
}

export default Grafico;
