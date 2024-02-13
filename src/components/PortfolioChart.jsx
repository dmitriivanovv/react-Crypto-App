import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useCrypto } from '../context/cryptoContext';

ChartJS.register(ArcElement, Tooltip, Legend);





const PortfolioChart = () => {

  const { assets } = useCrypto()
  const data = {
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: '$',
        data: assets.map(asset => asset.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 2)',
          'rgba(54, 162, 235, 2)',
          'rgba(255, 206, 86, 2)',
          'rgba(75, 192, 192, 2)',
          'rgba(153, 102, 255, 2)',
          'rgba(255, 159, 64, 2)',
        ],
      },
    ],
  };

  return (
    <div style={{
      display: 'flex',
      marginBottom: '2rem',
      marginTop: '2rem',
      justifyContent: 'center',
      height: '400px'
    }}>
      <Pie data={data} />
    </div>
  )
}


export default PortfolioChart