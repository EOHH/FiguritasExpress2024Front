import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { FaChartBar } from 'react-icons/fa'; // Icono de gráfico
import './OrderChart.css'; // Importar el CSS

// Registra los componentes de la gráfica
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api_int_2024/orders/lastSevenDays');
        const data = response.data;

        if (data && Array.isArray(data)) {
          const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
          const dates = data.map(item => {
            const date = new Date(item.fecha);
            return daysOfWeek[date.getDay()];
          });

          const orderCounts = data.map(item => item.cantidad);

          setChartData({
            labels: dates,
            datasets: [
              {
                label: 'Pedidos por Día',
                data: orderCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 10, // Bordes redondeados
              },
            ],
          });
          setLoading(false);
        } else {
          throw new Error('No data available');
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
        setError('No se pudo cargar los datos de pedidos');
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) return <p className="loading">Cargando datos...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="chart-container">
      <h2>
        <FaChartBar className="react-icon" />
        Pedidos en los Últimos 7 Días
      </h2>
      <div className="chart-wrapper">
        <Bar 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Cantidad de Pedidos',
                  color: '#333',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Días',
                  color: '#333',
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `Pedidos: ${context.raw}`;
                  },
                },
              },
            },
          }} 
        />
      </div>
    </div>
  );
};

export default OrderChart;
